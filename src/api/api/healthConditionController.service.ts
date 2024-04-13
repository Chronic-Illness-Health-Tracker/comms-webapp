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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ConditionCheckIn } from '../model/conditionCheckIn';
import { HealthCondition } from '../model/healthCondition';
import { Question } from '../model/question';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class HealthConditionControllerService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Add a question to an existing health condition
     * 
     * @param body 
     * @param conditionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addQuestion(body: Question, conditionId: string, observe?: 'body', reportProgress?: boolean): Observable<Question>;
    public addQuestion(body: Question, conditionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Question>>;
    public addQuestion(body: Question, conditionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Question>>;
    public addQuestion(body: Question, conditionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addQuestion.');
        }

        if (conditionId === null || conditionId === undefined) {
            throw new Error('Required parameter conditionId was null or undefined when calling addQuestion.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Question>('post',`${this.basePath}/condition/${encodeURIComponent(String(conditionId))}/question`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCondition(body: HealthCondition, observe?: 'body', reportProgress?: boolean): Observable<HealthCondition>;
    public createCondition(body: HealthCondition, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<HealthCondition>>;
    public createCondition(body: HealthCondition, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<HealthCondition>>;
    public createCondition(body: HealthCondition, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createCondition.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<HealthCondition>('post',`${this.basePath}/condition`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param conditionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteCondition(conditionId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteCondition(conditionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteCondition(conditionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteCondition(conditionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (conditionId === null || conditionId === undefined) {
            throw new Error('Required parameter conditionId was null or undefined when calling deleteCondition.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/name/${encodeURIComponent(String(conditionId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a health condition by its id
     * 
     * @param conditionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCondition(conditionId: string, observe?: 'body', reportProgress?: boolean): Observable<HealthCondition>;
    public getCondition(conditionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<HealthCondition>>;
    public getCondition(conditionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<HealthCondition>>;
    public getCondition(conditionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (conditionId === null || conditionId === undefined) {
            throw new Error('Required parameter conditionId was null or undefined when calling getCondition.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<HealthCondition>('get',`${this.basePath}/condition/${encodeURIComponent(String(conditionId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List of Health conditions
     * 
     * @param healthConditionName 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listHealthConditions(healthConditionName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<HealthCondition>>;
    public listHealthConditions(healthConditionName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<HealthCondition>>>;
    public listHealthConditions(healthConditionName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<HealthCondition>>>;
    public listHealthConditions(healthConditionName?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (healthConditionName !== undefined && healthConditionName !== null) {
            queryParameters = queryParameters.set('healthConditionName', <any>healthConditionName);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<HealthCondition>>('get',`${this.basePath}/condition`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a check ins information
     * 
     * @param body 
     * @param conditionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCheckIn(body: ConditionCheckIn, conditionId: string, observe?: 'body', reportProgress?: boolean): Observable<ConditionCheckIn>;
    public updateCheckIn(body: ConditionCheckIn, conditionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ConditionCheckIn>>;
    public updateCheckIn(body: ConditionCheckIn, conditionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ConditionCheckIn>>;
    public updateCheckIn(body: ConditionCheckIn, conditionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateCheckIn.');
        }

        if (conditionId === null || conditionId === undefined) {
            throw new Error('Required parameter conditionId was null or undefined when calling updateCheckIn.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<ConditionCheckIn>('put',`${this.basePath}/condition/${encodeURIComponent(String(conditionId))}/checkin`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCondition(body: HealthCondition, observe?: 'body', reportProgress?: boolean): Observable<HealthCondition>;
    public updateCondition(body: HealthCondition, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<HealthCondition>>;
    public updateCondition(body: HealthCondition, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<HealthCondition>>;
    public updateCondition(body: HealthCondition, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateCondition.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<HealthCondition>('put',`${this.basePath}/condition`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
