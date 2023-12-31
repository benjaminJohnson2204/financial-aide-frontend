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
/**
 * 
 * @export
 * @interface BudgetCategoryRelationBulkUpdateRequest
 */
export interface BudgetCategoryRelationBulkUpdateRequest {
    /**
     * 
     * @type {number}
     * @memberof BudgetCategoryRelationBulkUpdateRequest
     */
    category: number;
    /**
     * 
     * @type {string}
     * @memberof BudgetCategoryRelationBulkUpdateRequest
     */
    amount: string;
    /**
     * 
     * @type {boolean}
     * @memberof BudgetCategoryRelationBulkUpdateRequest
     */
    is_percentage: boolean;
    /**
     * 
     * @type {number}
     * @memberof BudgetCategoryRelationBulkUpdateRequest
     */
    id?: number;
}
