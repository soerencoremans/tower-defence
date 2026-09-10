# Tower Defence

A small browser tower defence game. Plain ES modules, zero dependencies, Node 22.

```
npm test    # unit tests, Node test runner
npm start   # serves the game on http://localhost:8080
```

Game code lives in `src/`, tests next to the source as `*.test.js`.

The game is built by the Loop-Forge Dev-Loop. `.loop-forge/config.json` holds the test command
that gates every hand-off; `.loop-forge/worktrees/` is where the loop checks out its branches.
