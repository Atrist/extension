// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


const insertText = (val:string) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('Can\'t insert log because no document is open');
        return;
    }

    const selection = editor.selection;

    const range = new vscode.Range(selection.start, selection.end);

    editor.edit((editBuilder) => {
        editBuilder.replace(range, val);
    });
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "atrist" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const insertLogStatement = vscode.commands.registerCommand('extension.insertLogStatement', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        text
            ? vscode.commands.executeCommand('editor.action.insertLineAfter')
                .then(() => {
                    const logToInsert = `console.log('${text}: ', ${text});`;
                    insertText(logToInsert);
                })
            : insertText('console.log();');

    });
    const insertWarnStatement = vscode.commands.registerCommand('extension.insertWarnLogStatement', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        text
            ? vscode.commands.executeCommand('editor.action.insertLineAfter')
                .then(() => {
                    const logToInsert = `console.warn('${text}: ', ${text});`;
                    insertText(logToInsert);
                })
            : insertText('console.warn();');

    });
    context.subscriptions.push(insertLogStatement);
    context.subscriptions.push(insertWarnStatement);
}

// This method is called when your extension is deactivated
export function deactivate() {}
