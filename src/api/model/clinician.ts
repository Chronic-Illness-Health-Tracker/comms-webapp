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
import { Organisation } from './organisation';

export interface Clinician { 
    id?: string;
    userId?: string;
    email?: string;
    title?: Clinician.TitleEnum;
    forename?: string;
    middlenames?: string;
    lastname?: string;
    contactNumber?: string;
    alternateContactNumber?: string;
    organisation?: Organisation;
}
export namespace Clinician {
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