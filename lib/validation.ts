import { z } from "zod";
export const MissionValidation = z.object({
  name: z
    .string()
    .min(5, { message: "Name is required with minimum 5 characters." }),
  status: z.enum(["pending", "inprogress", "complete"], {
    required_error: "Status is required",
    invalid_type_error: "Status is an enum of pending, inprogress, or complete",
  }),
  waypoints: z.array(
    z.object({
      frame: z.number({
        required_error: "frame is required",
        invalid_type_error: "frame must be a number",
      }),
      command: z.number({
        required_error: "command is required",
        invalid_type_error: "command must be a number",
      }),
      is_current: z.boolean({ required_error: "is_current is required" }),
      autocontinue: z.boolean({ required_error: "autocontinue is required" }),
      param1: z.number({
        required_error: "param1 is required",
        invalid_type_error: "param1 must be a number",
      }),
      param2: z.number({
        required_error: "param2 is required",
        invalid_type_error: "param2 must be a number",
      }),
      param3: z.number({
        required_error: "param3 is required",
        invalid_type_error: "param3 must be a number",
      }),
      param4: z.number({
        required_error: "param4 is required",
        invalid_type_error: "param4 must be a number",
      }),
      x_lat: z.number({
        required_error: "x_lat is required",
        invalid_type_error: "x_lat must be a number",
      }),
      y_long: z.number({
        required_error: "y_long is required",
        invalid_type_error: "y_long must be a number",
      }),
      z_alt: z.number({
        required_error: "z_alt is required",
        invalid_type_error: "z_alt must be a number",
      }),
    })
  ),
  altitude: z
    .number({
      required_error: "altitude is required",
      invalid_type_error: "altitude must be a number",
    })
    .positive({ message: "altitude must be positive" }),
  speed: z
    .number({
      required_error: "speed is required",
      invalid_type_error: "speed must be a number",
    })
    .positive({ message: "speed must be positive" }),

  InspectionTime: z.string().datetime({ message: "Invalid date." }),
  cronJobId: z.number().optional(),
});
