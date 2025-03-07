import { ID, Query, Databases } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
    .setEndPoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async () => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID); // for testing

    // 1. use appwrite SDK ti chack if the search term exists in the database
   try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries[
        Query.equal('searchTerm', searchTerm)
    ])

    //2. if it's does, update the count
    if (result.documents.lenght > 0) { // if the document exist
        const doc = result.documents[0]

        await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
            count: doc.count + 1
        })

    //3. if it's doesn't, create a new document with the search term and count as 1
    }else{
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }
    
   } catch (error) {
    
   }

    
}