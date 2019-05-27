import * as vscode from 'vscode'

const tree = {
    'level1Id': {
        'stage1Id': {},
        'stage2Id': {},
    },
    'level2Id': {
        'l2s1': {},
        'l2s2': {}
    }
}

function getChildren(key: string): string[] {
    if (!key) {
        return Object.keys(tree);
    }
    let treeElement = getTreeElement(key);
    if (treeElement) {
        return Object.values(treeElement);
    }
    return [];
}

function getTreeItem(key: string): vscode.TreeItem {
    const treeElement = getTreeElement(key);
    return {
        label: key,
        tooltip: `Tooltip for ${key}`,
        collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
    };
}

function getTreeElement(element: any): any {
    let parent = tree;
    const levels = Object.keys(parent)

    if (levels.includes(element)) {
        return Object.keys(parent[element])
    } else {
        return null
    }
}

function getNode(key: string): { key: string } {
    if (!nodes[key]) {
        nodes[key] = new Key(key);
    }
    return nodes[key];
}

export class TestView {

    constructor(context: vscode.ExtensionContext) {
        const view = vscode.window.createTreeView('progress', {
            treeDataProvider: aNodeWithIdTreeDataProvider(),
            showCollapseAll: true
        });
        // vscode.commands.registerCommand('progress.reveal', async () => {
        //     const key = await vscode.window.showInputBox({ placeHolder: 'Type the label of the item to reveal' });
        //     if (key) {
        //         await view.reveal({ key }, { focus: true, select: false, expand: true });
        //     }
        // });
    }
}

let nodes = {};

function aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{ key: string }> {
    return {
        getChildren: (element: { key: string }): { key: string }[] => {
            return getChildren(element ? element.key : '').map((key: string) => getNode(key));
        },
        getTreeItem: (element: { key: string }): vscode.TreeItem => {
            const treeItem = getTreeItem(element.key);
            treeItem.id = element.key;
            return treeItem;
        },
        getParent: ({ key }: { key: string }): { key: string } | undefined => {
            return new Key(key)
        }
    };
}



class Key {
    constructor(readonly key: string) { }
}