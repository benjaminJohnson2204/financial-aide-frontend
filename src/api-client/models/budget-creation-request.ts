/* tslint:disable */
/* eslint-disable */
/**
 * Financial Aide Backend
 * API Backend for Financial Aide open-source budgeting system
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IntervalEnum } from './interval-enum';
/**
 * 
 * @export
 * @interface BudgetCreationRequest
 */
export interface BudgetCreationRequest {
    /**
     * 
     * @type {string}
     * @memberof BudgetCreationRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof BudgetCreationRequest
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof BudgetCreationRequest
     */
    start_time: Date;
    /**
     * 
     * @type {Date}
     * @memberof BudgetCreationRequest
     */
    end_time: Date;
    /**
     * 
     * @type {IntervalEnum}
     * @memberof BudgetCreationRequest
     */
    interval: IntervalEnum;
    /**
     * 
     * @type {string}
     * @memberof BudgetCreationRequest
     */
    income: string;
    /**
     * 
     * @type {number}
     * @memberof BudgetCreationRequest
     */
    user: number;
}
