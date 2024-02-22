/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Address } from './address';
import { Gp } from './gp';
import { HealthCondition } from './healthCondition';

export interface Patient { 
    id?: string;
    email?: string;
    title?: Patient.TitleEnum;
    forename?: string;
    middlenames?: string;
    lastname?: string;
    contactNumber?: string;
    alternateContactNumber?: string;
    nhsNumber?: string;
    gp?: Gp;
    address?: Address;
    conditions?: Array<HealthCondition>;
    dateOfBirth?: Date;
}
export namespace Patient {
    export type TitleEnum = 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Mx' | 'Dr' | 'Prof' | 'Revd';
    export const TitleEnum = {
        Mr: 'Mr' as TitleEnum,
        Mrs: 'Mrs' as TitleEnum,
        Miss: 'Miss' as TitleEnum,
        Ms: 'Ms' as TitleEnum,
        Mx: 'Mx' as TitleEnum,
        Dr: 'Dr' as TitleEnum,
        Prof: 'Prof' as TitleEnum,
        Revd: 'Revd' as TitleEnum
    };
}