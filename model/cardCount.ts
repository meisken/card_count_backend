import { Schema, model, models } from "mongoose"

export const cardCountSchema = new Schema({
    playedCard: Number,
    multiplication: Number
})

export default models.cardCount ||  model("cardCount", cardCountSchema, "cardCount")