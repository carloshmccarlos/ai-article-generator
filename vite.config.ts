import tailwindcss from "@tailwindcss/vite";
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import {cloudflare} from '@cloudflare/vite-plugin'

export default defineConfig({

    plugins: [

        tsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tanstackStart({
            router: {
                quoteStyle: "double",
                semicolons: true,
            },
        }),
        viteReact(),
        tailwindcss(),
        cloudflare(),
    ],
});
