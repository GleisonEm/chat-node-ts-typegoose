// import { Collection } from "mongodb";
// import { User } from "src/types/User";
// import mongoose from "mongoose";
// import {
//   ConverseStatusModel,
//   ConverseStatus,
// } from "../../entities/mongodb/ConverseStatus";

// type MassCreationRequest = {
//   conversationId: mongoose.Schema.Types.ObjectId;
//   participants: Array<User>;
// };

// export class CreateConverseStatusService {
//   async massCreation({
//     conversationId,
//     participants,
//   }: MassCreationRequest): Promise<Boolean | Error> {
//     ConverseStatusModel.insertMany(
//       this.makeCollectionConverseStatus(conversationId, participants)
//     )
//       .then((result: any) => {
//         console.log("result ", result);
//       })
//       .catch((err: Error) => {
//         console.error("error ", err);
//       });

//     return true;
//   }
//   makeCollectionConverseStatus(
//     conversationId: mongoose.Schema.Types.ObjectId,
//     participants: Array<User>
//   ): Array<ConverseStatus> {
//     return participants.map((participant: User) => {
//       let converse = new ConverseStatus();

//       converse.userId = participant;
//       converse.conversationId = conversationId;
//       return converse;
//     });
//   }
// }
