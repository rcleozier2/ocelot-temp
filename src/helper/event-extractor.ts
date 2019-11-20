import { get, isNull } from "lodash";
import { format, formatDistance, differenceInMinutes } from "date-fns";
import normalizeResponse from "./normalize";

interface NormailizedResponse {
  distance: number;
  address: object;
  location: object;
  recipients: object;
  estimatedArrivalTime: number;
  estimatedCompletionTime: number;
  actualArrivalTime: number;
  actualCompletionTime: number;
  arrivalTimeDifference: number;
  completionTimeDifference: number;
  completed: boolean;
  failed: boolean;
  failureNotes: string;
  driver: string;
  admin: string;
  taskChain: Array<object>;
  totalTime: string;
}

const eventExtractor = (tasks: any) => {
  const normalizedResponse: NormailizedResponse = {
    distance: 0,
    address: get(tasks[0], "doc.data.task.destination.address", {}),
    location: get(tasks[0], "doc.data.task.destination.location", {}),
    recipients: get(tasks[0], "doc.data.task.recipients", {}),
    driver: "",
    admin: "",
    estimatedArrivalTime: 0,
    estimatedCompletionTime: 0,
    actualArrivalTime: 0,
    actualCompletionTime: 0,
    arrivalTimeDifference: 0,
    completionTimeDifference: 0,
    completed: false,
    failed: false,
    failureNotes: "",
    taskChain: [],
    totalTime: ""
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

    if (get(task, "doc.triggerName", "") === "taskAssigned") {
      normalizedResponse.driver = get(task, "wkr_name", "");
      normalizedResponse.admin = get(task, "adm_name", "");
    }

    if (get(task, "doc.triggerName", "") === "taskArrival") {
      normalizedResponse.distance = get(task, "doc.distance", 0);
      normalizedResponse.actualArrivalTime = get(task, "doc.time", 0);
      normalizedResponse.estimatedArrivalTime = get(
        task,
        "doc.data.task.estimatedArrivalTime",
        0
      );
      normalizedResponse.estimatedCompletionTime = get(
        task,
        "doc.data.task.estimatedCompletionTime",
        0
      );
    }

    if (get(task, "doc.triggerName", false) === "taskCompleted") {
      normalizedResponse.actualCompletionTime = get(
        task,
        "doc.data.task.completionDetails.time",
        0
      );
      normalizedResponse.completed = true;
    }

    if (get(task, "doc.triggerName", false) === "taskFailed") {
      normalizedResponse.actualCompletionTime = get(
        task,
        "doc.data.task.completionDetails.time",
        0
      );
      normalizedResponse.failed = true;
      normalizedResponse.failureNotes = get(
        task,
        "doc.data.task.completionDetails.notes",
        ""
      );
    }
  }); // End foreach

  if (
    !isNull(normalizedResponse.estimatedArrivalTime) &&
    !isNull(normalizedResponse.actualArrivalTime)
  ) {
    normalizedResponse.arrivalTimeDifference = differenceInMinutes(
      new Date(normalizedResponse.actualArrivalTime),
      new Date(normalizedResponse.estimatedArrivalTime)
    );
  }

  if (
    !isNull(normalizedResponse.estimatedCompletionTime) &&
    !isNull(normalizedResponse.actualCompletionTime)
  ) {
    normalizedResponse.completionTimeDifference = differenceInMinutes(
      new Date(normalizedResponse.actualCompletionTime),
      new Date(normalizedResponse.estimatedCompletionTime)
    );
  }

  normalizedResponse.totalTime = formatDistance(
    new Date(get(tasks[0], "ts", "")),
    new Date(get(tasks[tasks.length - 1], "ts", "")),
    { includeSeconds: true }
  );

  console.log(normalizedResponse);

  return normalizedResponse;
};

export default eventExtractor;
