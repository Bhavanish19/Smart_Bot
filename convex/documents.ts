import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
  async handler(ctx) {
    return await ctx.db.query('documents').collect(); // Return the list of documents
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(), // Validate that title is a string
  },
  async handler(ctx, args) {
    // Get the user ID of the authenticated user
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    console.log(userID);

    // Check if the user is authenticated
    if (!userID) {
      throw new ConvexError("Not authenticated");
    }

    // Insert a new document into the 'documents' collection with both title and tokenIdentifier
    await ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: userID, // Include the tokenIdentifier (userID)
    });
  },
});
