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
 * @interface PatchedBudgetCreationRequest
 */
export interface PatchedBudgetCreationRequest {
    /**
     * 
     * @type {string}
     * @memberof PatchedBudgetCreationRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedBudgetCreationRequest
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof PatchedBudgetCreationRequest
     */
    start_time?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PatchedBudgetCreationRequest
     */
    end_time?: Date;
    /**
     * 
     * @type {IntervalEnum}
     * @memberof PatchedBudgetCreationRequest
     */
    interval?: IntervalEnum;
    /**
     * 
     * @type {string}
     * @memberof PatchedBudgetCreationRequest
     */
    income?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedBudgetCreationRequest
     */
    user?: number;
}
