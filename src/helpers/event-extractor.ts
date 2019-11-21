import { get, isNull } from "lodash";
import { format, formatDistance, differenceInMinutes } from "date-fns";

interface NormailizedResponse {
  distance: number;
  address: object;
  location: object;
  recipients: object;
  times: {
    estimatedArrivalTime: number;
    estimatedCompletionTime: number;
    actualArrivalTime: number;
    actualCompletionTime: number;
    arrivalTimeDifference: number;
    completionTimeDifference: number;
    totalTime: string;
    arrivalStatus: string;
    completedStatus: string;
  },
  completed: boolean;
  failed: boolean;
  driver: string;
  admin: string;
  taskChain: Array<object>;
  notes: {
    driver: string;
    task: string;
    recipients: string;
  };
}

const eventExtractor = (tasks: any) => {
  const normalizedResponse: NormailizedResponse = {
    distance: 0,
    address: get(tasks[0], "doc.data.task.destination.address", {}),
    location: get(tasks[0], "doc.data.task.destination.location", {}),
    recipients: get(tasks[0], "doc.data.task.recipients", {}),
    driver: "",
    admin: "",
    times: {
      estimatedArrivalTime: 0,
      estimatedCompletionTime: 0,
      actualArrivalTime: 0,
      actualCompletionTime: 0,
      arrivalTimeDifference: 0,
      completionTimeDifference: 0,
      totalTime: "",
      arrivalStatus: "ontime",
      completedStatus: "ontime"
    },
    completed: false,
    failed: false,
    taskChain: [],
    notes: {
      driver: "",
      recipients: "",
      task: ""
    },
  };

  tasks.forEach((task: any, index: number) => {
    let timestampDistance = "";

    if (tasks[index + 1]) {
      timestampDistance = formatDistance(
        new Date(get(task, "ts", "")),
        new Date(get(tasks[index + 1], "ts", "")),
        { includeSeconds: true }
      );
    }

    normalizedResponse.taskChain.push({
      name: get(task, "doc.triggerName", ""),
      timestamp: get(task, "ts", ""),
      timestampFormatted: format(new Date(get(task, "ts", "")), "MM/dd/yyyy"),
      timestampDistance
    });

    if (get(task, "doc.triggerName", "") === "taskStarted") {
      normalizedResponse.driver = get(task, "wkr_name", "");
      normalizedResponse.admin = get(task, "creator_name", "");
      normalizedResponse.notes.task = get(task, "doc.data.task.notes", "");
    }

    if (get(task, "doc.triggerName", "") === "taskArrival") {
      normalizedResponse.distance = get(task, "doc.distance", 0);
      normalizedResponse.times.actualArrivalTime = get(task, "doc.time", 0);
      normalizedResponse.notes.recipients = get(
        task,
        "doc.data.task.destination.notes",
        ""
      );
      normalizedResponse.times.estimatedArrivalTime = get(
        task,
        "doc.data.task.estimatedArrivalTime",
        0
      );
      normalizedResponse.times.estimatedCompletionTime = get(
        task,
        "doc.data.task.estimatedCompletionTime",
        0
      );
    }

    if (get(task, "doc.triggerName", false) === "taskCompleted") {
      normalizedResponse.times.actualCompletionTime = get(
        task,
        "doc.data.task.completionDetails.time",
        0
      );
      normalizedResponse.completed = true;
    }

    if (get(task, "doc.triggerName", false) === "taskFailed") {
      normalizedResponse.times.actualCompletionTime = get(
        task,
        "doc.data.task.completionDetails.time",
        0
      );
      normalizedResponse.failed = true;
      normalizedResponse.notes.driver = get(
        task,
        "doc.data.task.completionDetails.notes",
        ""
      );
    }
  }); // End foreach

  if (
    !isNull(normalizedResponse.times.estimatedArrivalTime) &&
    !isNull(normalizedResponse.times.actualArrivalTime)
  ) {
    let difference = differenceInMinutes(
      new Date(normalizedResponse.times.actualArrivalTime),
      new Date(normalizedResponse.times.estimatedArrivalTime)
    );

    if (difference > 0) {
      normalizedResponse.times.arrivalStatus = "late";
    }

    if (difference < 0) {
      normalizedResponse.times.arrivalStatus = "early";
    }

    normalizedResponse.times.arrivalTimeDifference  = Math.abs(difference);
  }

  if (
    !isNull(normalizedResponse.times.estimatedCompletionTime) &&
    !isNull(normalizedResponse.times.actualCompletionTime)
  ) {
    
    let difference = differenceInMinutes(
      new Date(normalizedResponse.times.actualCompletionTime),
      new Date(normalizedResponse.times.estimatedCompletionTime)
    );

    if (difference > 0) {
      normalizedResponse.times.completedStatus = "late";
    }

    if (difference < 0) {
      normalizedResponse.times.completedStatus = "early";
    }

    normalizedResponse.times.completionTimeDifference  = Math.abs(difference);
  }

  normalizedResponse.times.totalTime = formatDistance(
    new Date(get(tasks[0], "ts", "")),
    new Date(get(tasks[tasks.length - 1], "ts", "")),
    { includeSeconds: true }
  );

  return normalizedResponse;
};

export default eventExtractor;
