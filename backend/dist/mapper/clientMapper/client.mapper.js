"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateClientDtoToClientModel = exports.mapClientToDTO = void 0;
const mapClientToDTO = (clientData) => {
    return {
        companyName: clientData.companyName,
        logo: clientData?.logo || '',
        description: clientData?.description || '',
        website: clientData?.website || '',
    };
};
exports.mapClientToDTO = mapClientToDTO;
const mapUpdateClientDtoToClientModel = (clientData) => {
    const dtoObj = {};
    if (clientData.companyName) {
        dtoObj.companyName = clientData.companyName;
    }
    if (clientData.description) {
        dtoObj.description = clientData.description;
    }
    if (clientData.logo) {
        dtoObj.logo = clientData.logo;
    }
    if (clientData.website) {
        dtoObj.website = clientData.website;
    }
    return { clientProfile: dtoObj };
};
exports.mapUpdateClientDtoToClientModel = mapUpdateClientDtoToClientModel;
//# sourceMappingURL=client.mapper.js.map