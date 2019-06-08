"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../utils/node");
const gitOrigin = 'coderoad';
/*
    SINGLE git cherry-pick %COMMIT%
    MULTIPLE git cherry-pick %COMMIT_START%..%COMMIT_END%
    if shell, run shell
*/
function gitLoadCommits(actions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commits, commands, files } = actions;
        console.log('commits to load', commits);
        for (const commit of commits) {
            const { stdout, stderr } = yield node_1.exec(`git cherry-pick ${commit}`);
            if (stderr) {
                console.error(stderr);
                throw new Error('Error loading commit');
            }
            console.log('add commit', stdout);
        }
        if (commands) {
            // TODO: run shell as task
            for (const command of commands) {
                const { stdout, stderr } = yield node_1.exec(command);
                if (stderr) {
                    console.error(stderr);
                    if (stderr.match(/node-gyp/)) {
                        // ignored error
                        throw new Error('Error running setup command');
                    }
                }
                console.log(`run command: ${command}`, stdout);
            }
        }
        if (files) {
            for (const filePath of files) {
                node_1.openFile(filePath);
            }
        }
    });
}
exports.gitLoadCommits = gitLoadCommits;
/*
    save commit
    git commit -am '${level}/${stage}/${step} complete'
*/
function gitSaveCommit(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const { levelId, stageId, stepId } = position;
        const { stdout, stderr } = yield node_1.exec(`git commit -am 'completed ${levelId}/${stageId}/${stepId}'`);
        if (stderr) {
            console.error(stderr);
            throw new Error('Error saving progress to Git');
        }
        console.log('save with commit & continue stdout', stdout);
    });
}
exports.gitSaveCommit = gitSaveCommit;
function gitClear() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // commit progress to git
            const { stderr } = yield node_1.exec('git reset HEAD --hard && git clean -fd');
            if (!stderr) {
                return;
            }
            console.error(stderr);
        }
        catch (error) {
            console.error(error);
        }
        throw new Error('Error cleaning up current unsaved work');
    });
}
exports.gitClear = gitClear;
function gitVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout, stderr } = yield node_1.exec('git --version');
        if (!stderr) {
            const match = stdout.match(/^git version (\d+\.)?(\d+\.)?(\*|\d+)/);
            if (match) {
                // eslint-disable-next-line
                const [_, major, minor, patch] = match;
                return `${major}${minor}${patch}`;
            }
        }
        throw new Error('Git not installed. Please install Git');
    });
}
exports.gitVersion = gitVersion;
function gitInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stderr } = yield node_1.exec('git init');
        if (stderr) {
            throw new Error('Error initializing Gits');
        }
    });
}
function gitInitIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const hasGit = yield gitVersion();
        if (!hasGit) {
            throw new Error('Git must be installed');
        }
        const hasGitInit = node_1.exists('.git');
        if (!hasGitInit) {
            yield gitInit();
        }
    });
}
exports.gitInitIfNotExists = gitInitIfNotExists;
function gitAddRemote(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { stderr } = yield node_1.exec(`git remote add ${gitOrigin} ${repo} && git fetch ${gitOrigin}`);
        if (stderr) {
            const alreadyExists = stderr.match(`${gitOrigin} already exists.`);
            const successfulNewBranch = stderr.match('new branch');
            // validate the response is acceptable
            if (!alreadyExists && !successfulNewBranch) {
                console.error(stderr);
                throw new Error('Error adding git remote');
            }
        }
    });
}
exports.gitAddRemote = gitAddRemote;
function gitCheckRemoteExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { stdout, stderr } = yield node_1.exec('git remote -v');
            if (stderr) {
                return false;
            }
            // string match on remote output
            // TODO: improve the specificity of this regex
            return !!stdout.match(gitOrigin);
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    });
}
exports.gitCheckRemoteExists = gitCheckRemoteExists;
function gitSetupRemote(repo) {
    return __awaiter(this, void 0, void 0, function* () {
        // check coderoad remote not taken
        const hasRemote = yield gitCheckRemoteExists();
        // git remote add coderoad tutorial
        // git fetch coderoad
        if (!hasRemote) {
            yield gitAddRemote(repo);
        }
    });
}
exports.gitSetupRemote = gitSetupRemote;
//# sourceMappingURL=git.js.map