import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        clearMocks: true,
        restoreMocks: true,
        name: {
            label: "Server testing",
            color: "magenta",
        },
        pool: "threads",
        poolOptions: {
            singleThread: true,
        },
    },
    plugins: [],
});
