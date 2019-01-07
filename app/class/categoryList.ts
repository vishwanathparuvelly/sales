export const CATEGORY_LIST:any=[
    {
      "ruleCategory":"Exception Rules",
      "payLoadName":"exceptionRule",
      "priority":1,
      "attributeList":[
        {
          "uiLabel":"Customer ID",
          "payLoadName":"customerId",
          "dataType":"number",
          "isList":true
        },{
          "uiLabel":"Distributor ID",
          "payLoadName":"distributorId",
          "dataType":"number",
          "isList":true
        }
      ]
    },{
      "ruleCategory":"Deal Based Rules",
      "payLoadName":"dealRule",
      "priority":2,
      "attributeList":[
        {
          "uiLabel":"Deal/Opportunity ID",
          "payLoadName":"dealId",
          "dataType":"number",
          "isList":true
        }
      ]
    },{
      "ruleCategory":"Named Account Rule",
      "payLoadName":"namedAccount",
      "priority":3,
      "attributeList":[
        {
          "uiLabel":"Named Account",
          "payLoadName":"namedAccountId",
          "dataType":"number",
          "isList":true
        }  
      ]
    },{
      "ruleCategory":"Geo Account Rule",
      "payLoadName":"geoAccount",
      "priority":4,
      "attributeList":[
        {
          "uiLabel":"Geo Account",
          "payLoadName":"geoAccountId",
          "dataType":"number",
          "isList":true
        }
      ]
    },{
      "ruleCategory":"Partner Based Rules",
      "payLoadName":"partnerRule",
      "priority":5,
      "attributeList":[
        {
          "uiLabel":"Partner BE ID",
          "payLoadName":"partnerBeID",
          "dataType":"number",
          "isList":true
        },{
          "uiLabel":"Partner BE GEO ID",
          "payLoadName":"partnerBeGeoId",
          "dataType":"number",
          "isList":true
        }
      ]
    },{
      "ruleCategory":"Service Rules",
      "payLoadName":"serviceRule",
      "priority":6,
      "attributeList":[
        {
          "uiLabel":"Sales Motion",
          "payLoadName":"salesMotion",
          "dataType":"text",
          "isList":true
        },
        {
          "uiLabel":"Route to Market",
          "payLoadName":"routeToMarket",
          "dataType":"text",
          "isList":true
        }
      ]
    }
  ]