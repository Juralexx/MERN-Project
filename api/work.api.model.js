import mongoose from 'mongoose'

const WorkApiModel = new mongoose.Schema(
    {
        code_grand_domaine: { type: String },
        appelation_grand_domaine: { type: String },
        code_domaine: { type: Number },
        appelation_domaine: { type: String },
        code_fiche_rome: { type: String },
        appelation_fiche_rome: { type: String },
        code_ogr: { type: Number },
        appelation_metier: { type: String }
    },
);

export default mongoose.model("work", WorkApiModel)