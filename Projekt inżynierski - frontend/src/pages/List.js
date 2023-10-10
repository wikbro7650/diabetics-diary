// import React, { useEffect, useState } from "react";
// import { ServerApiVersion } from "mongodb";

// // const uri =
// //   "mongodb+srv://wiki648:kotma4koty@cluster0.tjptpfu.mongodb.net/?retryWrites=true&w=majority";

// const MyComponent = () => {
//   const [data, setData] = useState(null);

//   // useEffect(() => {
//   //   const client = new MongoClient(uri, {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true,
//   //     serverApi: ServerApiVersion.v1,
//   //   });
//   //   client.connect((err) => {
//   //     const collection = client.db("test").collection("devices");
//   //     // Perform actions on the collection object
//   //     // For example, you can retrieve data from the collection like this:
//   //     collection.find({}).toArray((error, documents) => {
//   //       setData(documents);
//   //     });
//   //     client.close();
//   //   });
//   // }, []);

//   return (
//     <div>
//       {data && data.map((item) => <div key={item._id}>{item.name}</div>)}
//     </div>
//   );
// };

// export default MyComponent;
