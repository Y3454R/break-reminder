import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "break-reminder.start",
    () => {
      vscode.window.showInformationMessage("Break Reminder started!");

      // Prompt the user to enter the interval in minutes
      vscode.window
        .showInputBox({ prompt: "Enter interval in minutes" })
        .then((value) => {
          const intervalMinutes = parseInt(value || "60", 10);
          if (isNaN(intervalMinutes) || intervalMinutes <= 0) {
            vscode.window.showErrorMessage(
              "Invalid interval. Please enter a positive number."
            );
            return;
          }

          // Convert interval to milliseconds
          const intervalMillis = intervalMinutes * 60 * 1000;

          // Set an interval to show reminder messages
          setInterval(() => {
            vscode.window.showInformationMessage(
              "Time to take a break and take a little walk!"
            );
          }, intervalMillis);
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
