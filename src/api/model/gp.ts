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
import { GpSurgery } from './gpSurgery';

export interface Gp { 
    id?: string;
    title?: Gp.TitleEnum;
    forename?: string;
    middlenames?: string;
    lastname?: string;
    email?: string;
    contactNumber?: string;
    surgery?: GpSurgery;
}
export namespace Gp {
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