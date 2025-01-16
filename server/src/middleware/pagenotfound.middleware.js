const CommonModel = require('../models/common.model');

const PageNotFoundMiddleware = async(req, res, next) => {
        try {
            req.body.db_request_data = {'post_data' : {...req.body}, 'get_data' : {...req.query}}
            req.body.is_demo_project_check = 0;
            var result_data = 1;

            var is_true = false;

            if(req.path == '/api/v1/delete_project' || req.path == '/api/v1/delete_project_s3' || req.path == '/api/v1/update_deleted_project_status'){
              
                next();
                return true;
            }

            if(req.body.formData?.project_id != '' && req.body.formData?.project_id != undefined && req.body.formData?.project_id != null && req.body.formData?.project_id != 'null' && req.body.formData?.project_id != 'undefined')
            {
                var is_true = true;
            }

            if((req.query.project_id != '' && req.query.project_id != undefined && req.query.project_id != null && req.query.project_id != 'null' && req.query.project_id != 'undefined') || (req.body.project_id != '' && req.body.project_id != undefined && req.body.project_id != null && req.body.project_id != 'null' && req.body.project_id != 'undefined') || (is_true == true)) {

                var project_id = req.query.project_id;
                if((req.body.project_id != '' && req.body.project_id != undefined && req.body.project_id != null && req.body.project_id != 'null' && req.body.project_id != 'undefined')){
                    var project_id = req.body.project_id;
                }

                if(is_true == true){
                    var project_id = req.body.formData?.project_id;
                }
                
                var params = {};
                params.table_name = 'tbl_projects';
                params.column_names = 'id, is_demo_project';
                params.where_condition = "project_uuid = '"+project_id+"' and is_deleted = 'N'";
                var data = await CommonModel.get_data(params);
    
                result_data = data.length;
                if(result_data > 0){
                    req.body.is_demo_project_check = data[0].is_demo_project
                }
            }

            if(result_data == 0){
                res.status(200).send(
                {
                    'valid'         : false,
                    'data_not_found': true,
                    'message': 'Data Not Found'
                });
                return true;
            }



            next();
        } catch (e) {
            next(e);
        }
    
}

module.exports = PageNotFoundMiddleware;