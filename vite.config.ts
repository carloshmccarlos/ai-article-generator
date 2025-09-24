import tailwindcss from "@tailwindcss/vite";
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import netlify from '@netlify/vite-plugin-tanstack-start'

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
