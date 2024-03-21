export class GetItemList {
    ComposeID: string
    ComposeName: string
    selected: boolean
    BriefSummary: string
    visible: boolean
    ItemList: ItemList[]
    /**
     * @typedef  {Object} GetItemList 
     * @property {string} ComposeID 组合ID
     * @property {string} ComposeName 组合名称
     * @property {boolean} selected 是否选中
     * @property {boolean} visible  是否显示
     * @property {ItemList[]} ItemList 组合明细
     */
    constructor({ ComposeID, ComposeName, BriefSummary, selected, visible, ItemList, isInit } = {} as any) {
        this.ComposeID = ComposeID;
        this.ComposeName = ComposeName;
        this.BriefSummary = BriefSummary;
        this.selected = selected ?? true;
        this.visible = visible ?? true;
        this.initChilrenData(ItemList, isInit)
    }

    initChilrenData(itemList: any[], isInit = false) {
        if (!itemList) {
            this.ItemList = []
            return;
        }
        this.ItemList = itemList.map((item: any) => {
            return new ItemList({ ...item, Value: isInit ? '' : item.Value });
        })
    }

}




export class ItemList {
    ItemID: string
    ItemName: string
    ItemUnit: string
    Value: string
    HighValue: string
    LowValue: string
    MaxValue: string
    MinValue: string
    /**
     * @typedef  {Object} ItemList
     * @property {string} ItemID 项目ID
     * @property {string} ItemName 项目名称
     * @property {string} ItemUnit 单位
     * @property {string} Value 结果值
     * @property {string} HighValue 高值
     * @property {string} LowValue   低值
     * @property {string} MaxValue    最大值
     * @property {string} MinValue    最小值
     */
    constructor({ ItemID, ItemName, ItemUnit, Value, HighValue, LowValue, MaxValue, MinValue } = {} as any) {
        this.ItemID = ItemID;
        this.ItemName = ItemName;
        this.ItemUnit = ItemUnit;
        this.Value = Value;
        this.HighValue = HighValue;
        this.LowValue = LowValue;
        this.MaxValue = MaxValue;
        this.MinValue = MinValue;

    }
}


/**
 * 详细数据
 */
export class DetailData {
    itemName: string
    itemVaule: string
    ItemUnit: string
    itemReferVaule: string
    itemTips: string
    /**
     * @typedef  {Object} Data
     * @property {string} itemName 检查项
     * @property {string} itemVaule 检查结果
     * @property {string} ItemUnit 单位
     * @property {string} itemReferVaule 参考值
     * @property {string} itemTips 提示 上升，还是下降
     */
    constructor({ ItemName, Value, HighValue, LowValue, ItemUnit, itemTips } = {} as any) {
        this.itemName = ItemName;
        this.itemVaule = Value;
        this.itemReferVaule = `${LowValue}~${HighValue}`;
        this.itemTips = itemTips;
        this.ItemUnit = ItemUnit;
    }
}

export class ReportData {
    typeName: string
    result: string
    data: DetailData[]
    /**
     * @typedef  {Object} ReportData
     * @property {string} typeName
     * @property {string} result
     * @property {Data[]} data
     */
    constructor({ ComposeName, BriefSummary, ItemList } = {} as any) {
        this.typeName = ComposeName;
        this.result = BriefSummary;
        this.data = this.initData(ItemList);
    }
    initData(data: any) {
        return data.map((item: any) => {
            return new DetailData(item)
        })
    }
}

export class YDApi {
    id: string
    reportData: ReportData[]
    /**
     * @typedef  {Object} YDApi
     * @property {string} id
     * @property {ReportData[]} reportData
     */
    constructor({ id, reportData } = {} as any) {
        this.id = id ?? '8b462250-3ba8-4a12-ac3d-98a23aab07e7';
        this.reportData = this.initReportData(reportData);
    }

    initReportData(reportData: any[]) {
        return reportData.map((item) => new ReportData(item));
    }
}

/**
 * 大模型的入参
 */
export class LLMApi {
    system_content: string
    API_KEY: string
    AI_API_URL: string
    user_content: string
    constructor({ system_content, API_KEY, AI_API_URL, user_content } = {} as any) {
        this.system_content = system_content || window.systemConfig.Template;
        this.API_KEY = API_KEY || window.systemConfig.API_KEY;
        this.AI_API_URL = AI_API_URL || window.systemConfig.AI_API_URL;
        this.user_content = user_content ?? "";
    }
}