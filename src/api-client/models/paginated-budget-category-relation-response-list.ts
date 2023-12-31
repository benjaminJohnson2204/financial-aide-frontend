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
import { BudgetCategoryRelationResponse } from './budget-category-relation-response';
/**
 * 
 * @export
 * @interface PaginatedBudgetCategoryRelationResponseList
 */
export interface PaginatedBudgetCategoryRelationResponseList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedBudgetCategoryRelationResponseList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedBudgetCategoryRelationResponseList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedBudgetCategoryRelationResponseList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<BudgetCategoryRelationResponse>}
     * @memberof PaginatedBudgetCategoryRelationResponseList
     */
    results?: Array<BudgetCategoryRelationResponse>;
}
