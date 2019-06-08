"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic = {
    id: 'tutorialId',
    meta: {
        version: '0.1.0',
        repo: 'https://github.com/ShMcK/coderoad-vscode.git',
        createdBy: 'shmck',
        createdAt: 'Sat, 11 May 2019 18:25:24 GMT',
        updatedBy: 'shmck',
        updatedAt: 'Sat, 11 May 2019 18:25:24 GMT',
        contributors: ['shmck'],
        languages: ['javascript'],
        testRunner: 'jest',
    },
    data: {
        summary: {
            title: 'Basic Test',
            description: 'A basic coding skills example',
            levelList: ['level1Id'],
        },
        levels: {
            level1Id: {
                stageList: ['stage1Id'],
                content: {
                    title: 'Sum Level',
                    text: 'A description of this stage',
                },
            },
        },
        stages: {
            stage1Id: {
                stepList: ['step1Id', 'step2Id', 'step3Id'],
                content: {
                    title: 'Sum Stage',
                    text: 'A description of this stage',
                },
            },
        },
        steps: {
            step1Id: {
                content: {
                    title: 'Sum',
                    text: 'Write a function that adds two numbers together',
                },
                actions: {
                    setup: {
                        commits: ['430500f', '8383061'],
                        commands: ['npm install'],
                        files: ['src/sum.js'],
                    },
                    solution: {
                        commits: ['abbe136'],
                    },
                },
                hints: [],
            },
            step2Id: {
                content: {
                    title: 'Multiply',
                    text: 'Write a function that multiplies two numbers together',
                },
                actions: {
                    setup: {
                        commits: ['9cbb518'],
                        files: ['src/multiply.js'],
                    },
                    solution: {
                        commits: ['5ae011f'],
                    },
                },
                hints: [],
            },
            step3Id: {
                content: {
                    title: 'Divide',
                    text: 'Write a function that divides',
                },
                actions: {
                    setup: {
                        commits: ['70c774c'],
                        files: ['src/divide.js'],
                    },
                    solution: {
                        commits: ['3180bed'],
                    },
                },
                hints: [],
            },
        },
    },
};
exports.default = basic;
//# sourceMappingURL=basic.js.map