
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;

export const queryHospitalList = (page,pageSize, keyname,provinceId,cityId,areaId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        keyword: keyname,
        provinceId: provinceId,
        cityId: cityId,
        areaId: areaId,
        page: page,
        pageSize: pageSize
    }
    return Api.requestForm2('/hospital/findHospital', params)
        .then(res => res);
}

export const addHospital = (form,address) => {

    let params = {
        token: sessionStorage.getItem("token"),
        hospitalCode:form.hospitalCode,
        hospitalName: form.hospitalName,
        affiliatedHospital: form.affiliatedHospital,
        hospitalType: form.hospitalType,
        hospitalLevel: form.hospitalLevel,
        hospitalAddress: form.hospitalAddress,
        contactInformation: form.contactInformation,
        bak:form.bak,
        locatedProvince:address.provincename,
        provinceId:address.provinceid,
        locatedCity:address.cityname,
        cityId:address.cityid,
        locatedArea:address.countryname,
        areaId:address.countryid,
    }
    return Api.requestForm2('/hospital/addhospital', params)
        .then(res => res);
}

export const delethospital = (hospitalId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        hospitalId:hospitalId,
    }
    return Api.requestForm2('/hospital/delethospital', params)
        .then(res => res);
}

export const updatehospital = (form,address) => {

    let params = {
        token: sessionStorage.getItem("token"),
        // hospitalCode:form.hospitalCode,
        hospitalId: form.hospitalId,
        hospitalName: form.hospitalName,
        affiliatedHospital: form.affiliatedHospital,
        hospitalType: form.hospitalType,
        hospitalLevel: form.hospitalLevel,
        hospitalAddress: form.hospitalAddress,
        contactInformation: form.contactInformation,
        bak:form.bak,
        locatedProvince:address.provincename,
        provinceId:address.provinceid,
        locatedCity:address.cityname,
        cityId:address.cityid,
        locatedArea:address.countryname,
        areaId:address.countryid,
    }
    return Api.requestForm2('/hospital/updateuser', params)
        .then(res => res);
}

export const getprovince = () => {

    let params = {
        
    }
    return Api.requestForm2('/address/queryprovince', params)
        .then(res => res);
}

export const getcity = (provinceId) => {

    let params = {
        provinceId:provinceId
    }
    return Api.requestForm2('/address/querycity', params)
        .then(res => res);
}

export const getcountry = (cityId) => {

    let params = {
        cityId:cityId
    }
    return Api.requestForm2('/address/querycountry', params)
        .then(res => res);
}

export const findHospitalCount = () => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    return Api.requestForm2('/hospital/findHospitalCount', params)
        .then(res => res);
}