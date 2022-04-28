<template>
      <div>
             <el-button 
              @click="handleImport"
            icon="el-icon-download"
                       class="export"
                       size="mini"
                       type="primary"> 导入</el-button>
         <el-dialog :title="'PDF'" :visible.sync="open" width="400px" append-to-body>
    <el-upload
        :limit="1"
        :auto-upload="false"
        :before-upload="beforeUpload"
        action
       drag
        :file-list="fileArr"
        :show-file-list="true" 
        :on-success="upSuccess" :on-error="upError" :on-change="imgPreview">
          <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip" style="color:red">提示：仅允许导入“pdf”格式文件！</div>
    </el-upload>
     <el-button size="small" @click="previewVisible=true">
             预览
           </el-button>
         </el-dialog>
              <el-dialog title="pdf预览" :visible.sync="previewVisible" :width="imgwidth">
      <pdf
      ref="pdf"
      :src="pdfUrl" 
      @load="onimgLoad"
      ></pdf>
</el-dialog>
    </div>  
</template>
<script>
import pdf from "vue-pdf";
export default {
   components: {pdf},
   data() {
    return {
      form: {
        position: '',
      },
      previewVisible:false,
      open:false,
      　imgwidth:'',
        pdfUrl: "",
      numPages: [],
      fileArr: [],
      upLoadImgUrl: "",  
    }
    },
    methods:{
        handleImport() {
      this.open = true
    },
    　onimgLoad(e) {
    const img = e.target//获取dom元素
    let width = 0
    if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
      width = img.width + 40
    }
    this.imgwidth = width + 'px'
　},
      beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pdf"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$msg("上传文件只能是PDF", "error");
        return false;
      }
    },
    imgPreview(file) {
      this.fileArr = [];
      this.fileArr.push(file);
      this.form.position = "";
      this.form.position = file.name;
      let fileName = file.name;
      let regex = /(.pdf)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.upLoadImgUrl = URL.createObjectURL(file.raw); // 获取URL
        this.pdfUrl = this.getPdfUrl(file);
      } else {
        this.$message.error("请选择PDF文件");
      }
    },
    // 上传成功
    upSuccess(res) {
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },
    // 上传失败
    upError(e) {
      this.$message({
        message: "上传失败",
        type: "error",
      });
    },
    //处理pdf
    getPdfUrl(file) {
      let url = window.URL.createObjectURL(file.raw); //将文件转化成url
      //加载pdf
      let loadingTask = pdf.createLoadingTask(url);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
          console.log(this.numPages);
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
      return url;
    },
    }
}
</script>