import mongoose from 'mongoose'

const LocationApiModel = new mongoose.Schema(
    {
        REGRGP_NOM: { type: String },
        REG_NOM: { type: String },
        REG_NOM_OLD: { type: String },
        ACA_NOM: { type: String },
        DEP_NOM: { type: String },
        COM_CODE: { type: String },
        COM_CODE1: { type: String },
        COM_CODE2: { type: String },
        COM_ID: { type: String },
        COM_NOM_MAJ_COURT: { type: String },
        COM_NOM_MAJ: { type: String },
        COM_NOM: { type: String },
        UUCR_NOM: { type: String },
        DEP_CODE: { type: String },
        DEP_ID: { type: String },
        DEP_NOM_NUM: { type: String },
        DEP_NUM_NOM: { type: String },
        REG_CODE: { type: String },
        REG_ID: { type: String },
        REG_CODE_OLD: { type: String },
        REG_ID_OLD: { type: String },
        AUC_NOM: { type: String },
        geolocalisation: { type: String }
    },
);

export default mongoose.model("location", LocationApiModel)