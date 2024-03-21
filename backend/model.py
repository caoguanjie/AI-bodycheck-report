

class DetailData:
    def __init__(self, item_name, item_vaule, item_unit, item_refer_vaule, item_tips):
        self.item_name = item_name
        self.item_vaule = item_vaule
        self.item_unit = item_unit
        self.item_refer_vaule = item_refer_vaule
        self.item_tips = item_tips

class ReportData:
    def __init__(self, type_name, result, data):
        self.type_name = type_name
        self.result = result
        self.data = data

    @classmethod
    def init_data(cls, data):
        return [cls(item) for item in data]

class YDApi:
    def __init__(self, id, report_data):
        self.id = id if id is not None else '8b462250-3ba8-4a12-ac3d-98a23aab07e7'
        self.report_data = self.init_report_data(report_data)

    @classmethod
    def init_report_data(cls, report_data):
        return [cls(item) for item in report_data]