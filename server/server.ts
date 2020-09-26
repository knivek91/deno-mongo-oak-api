import {
    Application,
    Router,
    Context,
    Status
} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {
    getNotes
    // createNote,
    // getSingleNote
    // updateNote,
    // deleteNote
} from "./routes.ts";

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body = `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

const router = new Router();

router
    .get("/", (ctx: Context) => {
        ctx.response.body = "Welcome to notes api";
    })
    .get("/notes", getNotes);
// .get<{ id: string }>("/notes/:id", getSingleNote)
// .post("/notes", createNote);
// .put<{ id: string }>("/notes/:id", updateNote)
// .delete<{ id: string }>("/notes/:id", deleteNote);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// A basic 404 page
app.use(notFound);

app.listen({ port: 8000 });
console.log("Server is up and running!");

//  run with => deno run --watch --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable  server.ts
//  run with => deno run --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable  server.ts
//  run with import map to handle a source of truth for remote package  => 
//   deno run --watch --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable --importmap=import_map.json server.ts
