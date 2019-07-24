import * as CR from 'typings'

const basic: CR.Tutorial = {
  id: '1',
  meta: {
    version: '0.1.0',
    repo: 'https://github.com/ShMcK/coderoad-tutorial-basic.git',
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
      levelList: ['level1Id', 'level2Id'],
    },
    levels: {
      level1Id: {
        stageList: ['stage1Id', 'stage2Id'],
        content: {
          title: 'Operators',
          text: 'A description of this stage',
        },
      },
      level2Id: {
        stageList: ['a'],
        content: {
          title: 'Logic',
          text: 'Some basic logic in level 2'
        }
      }
    },
    stages: {
      stage1Id: {
        stepList: ['step1Id', 'step2Id', 'step3Id'],
        content: {
          title: 'Sum Stage',
          text: 'A description of this stage',
        },
      },
      stage2Id: {
        stepList: ['1', '2'],
        content: {
          title: 'Second Stage',
          text: 'Going into round 2'
        }
      },
      a: {
        stepList: ['a1', 'a2'],
        content: {
          title: 'Part 1',
          text: 'Going into round 1'
        }
      },
    },
    steps: {
      step1Id: {
        content: {
          title: 'Sum',
          text: 'Write a function `add` that adds two numbers together',
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
          text: 'Write a function `multiply` that multiplies two numbers together',
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
          text: 'Write a function `divide` that divides',
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
      1: {
        content: {
          title: 'Modulo',
          text: 'Modulo `%` it up'
        },
        actions: {
          setup: {
            commits: ['16d9699'],
            files: ['src/modulo.js'],
          },
          solution: {
            commits: ['bbf8aa5']
          }
        }
      },
      2: {
        content: {
          title: 'Power',
          text: 'Power up with `**` powers'
        },
        actions: {
          setup: {
            commits: ['683c8db'],
            files: ['src/power.js'],
          },
          solution: {
            commits: ['deaf3a8']
          }
        }
      },
      a1: {
        content: {
          title: 'Hello',
          text: 'Return the word "hello"'
        },
        actions: {
          setup: {
            commits: ['c539057'],
            files: ['src/hello.js'],
          },
          solution: {
            commits: ['ab7d57b']
          }
        }
      },
      a2: {
        content: {
          title: 'Bye',
          text: 'Return the word "bye"'
        },
        actions: {
          setup: {
            commits: ['abe8404'],
            files: ['src/hello.js'],
          },
          solution: {
            commits: ['6f40d18']
          }
        }
      },
    },
  },
}

export default basic
