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
import { BudgetResponse } from './budget-response';
/**
 * 
 * @export
 * @interface PaginatedBudgetResponseList
 */
export interface PaginatedBudgetResponseList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedBudgetResponseList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedBudgetResponseList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedBudgetResponseList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<BudgetResponse>}
     * @memberof PaginatedBudgetResponseList
     */
    results?: Array<BudgetResponse>;
}
