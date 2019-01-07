import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Resolve } from '@angular/router/src/interfaces';
import { systemProperties } from './properties';

@Injectable()
export class SalesCreditService {
    Url: string = 'https://tech.evontex.com/List_All_Business_Teams'
    operators = [
        {
            "attributeType": "string",
            "operators": [
                { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
                { "displayOperator": "Does not Equal", "sqlOperator": "<>(VALUE)" },
                { "displayOperator": "Starts With", "sqlOperator": "LIKE %(VALUE)" },
                { "displayOperator": "Ends With", "sqlOperator": "LIKE (VALUE)%" },
                { "displayOperator": "Contains", "sqlOperator": "LIKE %(VALUE)%" },
                { "displayOperator": "Does Not Contain", "sqlOperator": "NOT LIKE %(VALUE)" },
                { "displayOperator": "Does Not Start With", "sqlOperator": "NOT LIKE (VALUE)%" },
                { "displayOperator": "Does Not End With", "sqlOperator": "NOT LIKE %(VALUE)%" }
            ]
        },
        {
            "attributeType": "number",
            "operators": [
                { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
                { "displayOperator": "Does not Equal", "sqlOperator": "<>(VALUE)" },
                { "displayOperator": "Greater", "sqlOperator": ">(VALUE)" },
                { "displayOperator": "Equal or Greater", "sqlOperator": ">=(VALUE)" },
                { "displayOperator": "Less", "sqlOperator": "<(VALUE)" },
                { "displayOperator": "Equal or Less", "sqlOperator": "<=(VALUE)" },
                { "displayOperator": "Within", "sqlOperator": "BETWEEN (VALUE1) AND (VALUE2)" },
            ]
        },
        {
            "attributeType": "date",
            "operators": [
                { "displayOperator": "Equals", "sqlOperator": " =(VALUE)" },
                { "displayOperator": "On or After", "sqlOperator": ">=(VALUE)" },
                { "displayOperator": "Before", "sqlOperator": "<(VALUE)" },
                { "displayOperator": "Between", "sqlOperator": "BETWEEN (VALUE1) AND (VALUE2)" }
            ]
        }
    ]
    private authKey = 'Basic c2FsZXMtYWNjb3VudC5hZG1pbjokYWxlc0FjYzB1bnQ=';
    private OauthTokenUrl = 'https://linen-api.herokuapp.com/oauth/token grant_type=password username=linen.client password=linen';
    private newAuthKey = 'Basic OTExOTllYWEtYWU3MC00ODI4LWEzY2MtNWQ0YTgzMzBjNjc4OjRhNmU4NWVlLTBkMzUtNGY1Yy05ZGEyLWQ5NjBjZTUzYjU1ZA==';
    private authenticationToken = 'Basic OTExOTllYWEtYWU3MC00ODI4LWEzY2MtNWQ0YTgzMzBjNjc4OjRhNmU4NWVlLTBkMzUtNGY1Yy05ZGEyLWQ5NjBjZTUzYjU1ZA=='
    private authenticationUrl = 'https://linen-api.herokuapp.com/oauth/token';

    private testUrl = 'https://linen-api-v2.herokuapp.com/linen/api/fields';
    private getAllAttributeUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/used";
    private fetchLatestAttributeUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/available/latest";
    private createAttributeUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/create";
    private createProfileUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile/create";
    private createListUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues";
    private attributeMapValueUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/map/";
    private searchListUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues/_search";
    private getAllListsUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues";
    private getDistinctLists = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues/name/_distinct"
    private updateListUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues/";
    private updateBulkListUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/listvalues/update/_bulk";
    private getAllRuleHeaderUrl = "https://linen-api-v2.herokuapp.com/linen/api/rule";
    private getRuleHeaderInfoUrl = "https://linen-api-v2.herokuapp.com/linen/api/rule/{ruleHeaderId}";
    private getRuleHeaderExpressionUrl = "https://linen-api-v2.herokuapp.com/linen/api/rule/{ruleHeaderId}/expression";
    private createRuleHeaderExpressionUrl = "https://linen-api-v2.herokuapp.com/linen/api/{ruleHeaderId}/expression";
    private createRuleHeaderExpressionListUrl = "https://linen-api-v2.herokuapp.com/linen/api/{ruleHeaderId}/expression/list";
    private getRuleHeaderOwnersUrl = "https://linen-api-v2.herokuapp.com/linen/api/{ruleHeaderId}/owner";
    private createRuleHeaderOwnerDetailsUrl = "https://linen-api-v2.herokuapp.com/linen/api/{ruleHeaderId}/owner";
    private downloadUrl = "https://linen-api-v2.herokuapp.com/linen/api/file/download";
    private getAllCategoriesUrl = "https://linen-api-v2.herokuapp.com/linen/api/category";
    private getCategoriesLookupUrl = "https://linen-api-v2.herokuapp.com/linen/api/lookup/_search";
    private createCategoryUrl = "https://linen-api-v2.herokuapp.com/linen/api/category";
    private createBulkCategoryUrl = "https://linen-api-v2.herokuapp.com/linen/api/category/create/_bulk";
    private getAllProfilesUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile";
    private getProfileHeaderDetailUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile/";
    private getProfileDetailUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile/{profileHeaderId}/detail/{profileDetailId}";
    private addAttributeMapValueUrl = "https://linen-api-v2.herokuapp.com/linen/api/attribute/map/";
    private getProfileExpressionUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile/";
    private createRuleUrl = "https://linen-api-v2.herokuapp.com/linen/api/rule/create";
    private getAllRulesUrl = "https://linen-api-v2.herokuapp.com/linen/api/rule";
    private updateProfileUrl = "https://linen-api-v2.herokuapp.com/linen/api/profile/";
    private testToken = 'Basic bGluZW4uY2xpZW50OmxpbmVu';
    private headers = new HttpHeaders();
    private access_token_obj: any = {};
    private access_token: any = null;
    private SystemProperties: systemProperties;
    constructor(private http: Http, private httpClient: HttpClient) {
        // console.log('App service Initialized');
        /*this.headers.set('Content-Type', 'application/json') 
                    .set('Authorization', this.authKey);*/
        //console.log("the header" , this.headers);
    }

    sampleApi(): Observable<any> {
        let bodyParam = {
            SECRETCODE: "EDFGJS-DHSHAJ-DASHJDJH-DHJSGAJH",
            skip: 0,
            limit: 10,
            sortOptions: {}
        }
        return this.httpClient.post(this.Url, bodyParam)
            .map((res: Response) => res);
    }

    operatorsJSON(): Observable<any> {
        return this.httpClient.get("assets/operatorsList.json")
            .map((res: Response) => res)
    }
    test() {

        return this.httpClient.get(this.testUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/x-www-form-urlencoded")
        })
            .map((res: Response) => {
                // console.log("the info from test",res);
            });
    }
    getAllAttribute(): Observable<any> {
        console.log("the systemProperties", this.SystemProperties);
        return this.httpClient.get(this.getAllAttributeUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/x-www-form-urlencoded")
        })
            .map((res: Response) => res);
    }
    fetchLatestAttrbute(fetchVar): Observable<any> {
        console.log("fetchVra is", fetchVar);
        let params = new HttpParams();
        params = params.append("fixedAttribute", fetchVar.fixedAttribute);
        params = params.append("colType", fetchVar.colType);
        console.log("the params are ", params);
        return this.httpClient.get(this.fetchLatestAttributeUrl, {
            withCredentials: true,
            params: params,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/x-www-form-urlencoded")
        })
            .map((res: Response) => res);
    }
    createAttribute(attributeObj): Observable<any> {
        return this.httpClient.post(this.createAttributeUrl, attributeObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createProfile(profileObj): Observable<any> {
        return this.httpClient.post(this.createProfileUrl, profileObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createList(listObj) {
        return this.httpClient.post(this.createListUrl, listObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    fetchAttributeMapValue(mapId) {
        return this.httpClient.get(this.attributeMapValueUrl + mapId + "/values", {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    searchListValue(listName) {
        let params = new HttpParams();
        params = params.append("listName", listName);
        return this.httpClient.get(this.searchListUrl, {
            withCredentials: true,
            params: params,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    fetchAllList(attributeName?: string): Observable<any> {
        let params = new HttpParams();
        if (attributeName) {
            params = params.append("attributeName", attributeName);
        }
        // let params = new HttpParams();
        //params = params.append("listName",attributeName );
        return this.httpClient.get(this.getDistinctLists, {
            withCredentials: true,
            params: params,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    updateList(listObj): Observable<any> {
        return this.httpClient.put(this.updateListUrl + listObj.id, listObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getAllRuleHeaders() {
        return this.httpClient.get(this.getAllRuleHeaderUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getRuleHeaderInfo(): Observable<any> {
        return this.httpClient.get(this.getRuleHeaderInfoUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getRuleHeaderExpression(): Observable<any> {
        return this.httpClient.get(this.getRuleHeaderExpressionUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createRuleHeaderExpression(expressionObj): Observable<any> {
        return this.httpClient.post(this.createRuleHeaderExpressionUrl, expressionObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createRuleHeaderExpressionList(expressionObj) {
        return this.httpClient.post(this.createRuleHeaderExpressionListUrl, expressionObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    updateBulkList(listObj) {
        return this.httpClient.put(this.updateBulkListUrl, listObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getAllCategory(): Observable<any> {
        return this.httpClient.get(this.getAllCategoriesUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getCatgeoryLookup(catgeory) {
        let params = new HttpParams();
        params = params.append("lookUpType", catgeory);
        return this.httpClient.get(this.getCategoriesLookupUrl, {
            withCredentials: true,
            params: params,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createCategory(categoryObj) {
        return this.httpClient.post(this.createCategoryUrl, categoryObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    createBullkCategory(categoryObj) {
        return this.httpClient.post(this.createBulkCategoryUrl, categoryObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getAllProfiles() {
        return this.httpClient.get(this.getAllProfilesUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getProfileExpression(profileHeaderId) {
        // {referenceId}/expression"
        return this.httpClient.get(this.getProfileExpressionUrl + profileHeaderId + "/expression", {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getProfileHeaderDetail(profileHeaderId) {
        return this.httpClient.get(this.getProfileHeaderDetailUrl + profileHeaderId + "/detail", {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    addMapAttributeValue(mapId, values) {

        return this.httpClient.post(this.addAttributeMapValueUrl + mapId + "/values", values, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    getAllRules() {
        console.log("the systemProperties ", this.SystemProperties);
        return this.httpClient.get(this.getAllRulesUrl, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }

    createRule(ruleObj) {
        return this.httpClient.post(this.createRuleUrl, ruleObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    updateProfile(profileObj, profileHeaderId) {
        return this.httpClient.put(this.updateProfileUrl + profileHeaderId, profileObj, {
            withCredentials: true,
            headers: new HttpHeaders().set('Authorization', 'Basic bGluZW4uY2xpZW50OmxpbmVu')
                .set("x-tenant-key", "bb7775d627d94fec9697d666dd7b578c")
                .set("Content-type", "application/json")
        })
            .map((res: Response) => res);
    }
    /*download(){
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        const headers = new Headers();
        headers.append('Accept', 'text/plain');
        return this.http.get(this.downloadUrl,{ headers: headers })
        .toPromise()
        .then((response:Response)=>response);
    }
       /* return  this.httpClient.get(this.downloadUrl,{
            withCredentials:true,
            headers: new HttpHeaders().set('Authorization','Basic bGluZW4uY2xpZW50OmxpbmVu')
            .set("x-tenant-key","bb7775d627d94fec9697d666dd7b578c")
            /* .set("Content-type","application/octet-stream")
            .set('Content-Disposition','attachment; filename=data.json')*/
    /* .map((res:Response)=> console.log(res.headers));
}*/

}