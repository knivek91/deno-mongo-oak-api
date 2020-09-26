import { RouterContext, Context, Status } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import db from "./mongodb.ts";


// https://deno.land/x/oak@v6.0.1/examples/routingServer.ts

interface INote {
    title: string;
    body: string;
    date: Date;
}

const notesCollection = db.collection("notes");

export const getNotes = async (ctx: Context) => {
    const notes = await notesCollection.find();
    ctx.response.body = notes;
};

export const getSingleNote = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const note = await notesCollection.findOne({
        _id: { $oid: id }
    });
    ctx.response.body = note;
};

export const createNote = async (ctx: RouterContext) => {
    // let note: Partial<INote> | undefined;
    if (!ctx.request.hasBody) {
        ctx.throw(Status.BadRequest, "Bad Request");
    }
    const body = await ctx.request.body();
    const value = await body.value;
    const note = {
        title: value.title,
        body: value.body,
        date: new Date()
    };
    console.log(value);

    // const id = await notesCollection.insertOne(note);
    // console.log(id);

    ctx.response.status = 201;
    ctx.response.body = "inserted";
    // ctx.response.body = { ...note, _id: id };
};

// export const updateNote = async (ctx: RouterContext) => {
//     const id = ctx.params.id;
//     const { value } = await ctx.request.body();
//     const { modifiedCount } = await notesCollection.updateOne(
//         {
//             _id: { $oid: id }
//         },
//         {
//             $set: {
//                 title: value.title,
//                 body: value.body
//             }
//         }
//     );
//     if (!modifiedCount) {
//         ctx.response.status = 404;
//         ctx.response.body = { message: "note does not exists." };
//         return;
//     }

//     ctx.response.status = 200;
//     ctx.response.body = await notesCollection.findOne({
//         _id: { $oid: id }
//     });

//     // const { value } = await ctx.request.body();
//     // const note = {
//     //     title: value.title,
//     //     body: value.body,
//     //     date: new Date()
//     // };
//     // console.log(value);

//     // const id = await notesCollection.insertOne(note);
//     // console.log(id);

//     // ctx.response.status = 201;
//     // ctx.response.body = { ...note, _id: id };
// };

// export const deleteNote = async (ctx: RouterContext) => {
//     const id = ctx.params.id;

//     const count = await notesCollection.deleteOne({
//         _id: {
//             $oid: id
//         }
//     });
//     if (!count) {
//         ctx.response.status = 404;
//         ctx.response.body = "notes does not exists.";
//         return;
//     }

//     ctx.response.status = 204;
// };
