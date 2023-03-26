// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import * as fs from "fs";
import * as path from "path";

import {
  mainTemplate,
  storybookTemplate,
  styleTemplate,
} from "./templates/index";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "createComponent",
    async (uri) => {
      const fp = uri.fsPath;
      const componentName = await vscode.window.showInputBox({
        placeHolder: "Enter Component Name",
        validateInput: (value: string) => {
          if (!value) {
            return "Component Name Can't be Empty!";
          }
          return undefined;
        },
      });

      if (componentName) {
        const folderPath =
          vscode.workspace.workspaceFolders?.[0].uri.fsPath || "";
        const componentPath = path.join(fp, componentName);

        if (!fs.existsSync(componentPath)) {
          fs.mkdirSync(componentPath);

          const indexFilePath = path.join(
            componentPath,
            `${componentName}.tsx`
          );
          const storybookPath = path.join(
            componentPath,
            `${componentName}.stories.tsx`
          );
          const styledPath = path.join(componentPath, `style.ts`);

          fs.writeFileSync(indexFilePath, mainTemplate(componentName));
          fs.writeFileSync(storybookPath, storybookTemplate(componentName));
          fs.writeFileSync(styledPath, styleTemplate(componentName));

          vscode.window.showInformationMessage(`Component Created!`);
        } else {
          vscode.window.showInformationMessage(`Component already Exist`);
        }
      }
      vscode.window.showInformationMessage("Hello VsCode Extension!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
