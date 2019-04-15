Vue.component('article-modal', {
    props:["article"],
    data(){
        return{
            modalTitle: this.article ? this.article.title:"",
            modalText: this.article ? this.article.content:"",
            modalTags: this.article ? this.article.tags.join(","):"",
            modalError: "",
            modalImage: this.article ?this.article.featured_image:null
        }
    },    
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    watch:{
        article: function(val){
            if(val){
                this.modalTitle =  val.title;
                this.modalText =  val.content;
                this.modalTags = val.tags.join(",");
                
            }else{
                this.modalTitle =  "";
                this.modalText =  "";
                this.modalTags = "";
            }
        }
    },
    methods:{
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            this.createImage(files[0]);
          },
          createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
      
            reader.onload = (e) => {
              vm.modalImage = e.target.result;
            };
            reader.readAsDataURL(file);
          },
          removeImage: function (e) {
            this.modalImage = '';
          },
        _modalValidation(){
            if(this.modalTitle.trim()===""){
                this.modalError = "Title is empty"
                return false
            }
            if(this.modalText.trim()===""){
                this.modalError = "Content is empty"
                return false
            }
            return true
        },
        closeModal(){
            this.modalTitle="";
            this.modalText="";
            this.modalTags="";
            this.modalImage="";
            this.modalEditedid=false;
            this.$refs['my-modal'].hide()
        },
        getArticleData(isPublish){
            let formData = new FormData();
            formData.append("title", this.modalTitle);
            formData.append("content", this.modalText);
            formData.append("tags", this.modalTags.split(","));
            formData.append("isPublished", isPublish);
            if(this.modalImage){
                formData.append("image", dataURLtoFile(this.modalImage,"img")); //selama ni kesusahan karena this.modal image ini string base64 makanya gak dianggap sbg file
            }
           

            return formData
        },
        saveDraft(){
           
            this.save(false)
        },
        savePublish(){
            
            this.save(true)
            
        },
        save(isPublish){
            let posturl;
            let method;
            if(this.article){
                posturl = "/articles/"+this.article._id;
                method = "PATCH"
            }else{
                posturl = "/articles";
                method = "POST"
            }
            let data = this.getArticleData(isPublish);
            console.log(data)
            
           if(this._modalValidation()){
            myaxios({
                method:method,
                url: posturl,
                data,
             })
             .then(({data})=>{
                
                if(this.article){
                    this.$emit("update-success", data)
                }else{
                    this.$emit("create-success", data)
                    Swal.fire(
                     'Good job!',
                     'Create article success',
                     'success'
                   )
                }
                this.closeModal()
    
             })
             .catch(error=>{
                 handleAxiosError(error)
             })
           }

        }
    },
    template: `
    <b-modal ref="my-modal" size="lg" id="mymodal" title="Article" hide-footer ok-title="Publish" cancel-title="Save as Draft">
       
        <small>Title:</small>
        <input type="text" class="w-100" v-model="modalTitle">
        <br>
        <div v-if="!modalImage">
            <input type="file" @change="onFileChange" accept="image/*">
        </div>
        <div v-else>
            <img id="modal-image" :src="modalImage" />
            <button @click="removeImage">Remove image</button>
        </div>
        <br>
        <small>Article:</small>
        <wysiwyg v-model="modalText"></wysiwyg>
        <small>Tags: (seperate tags with comma)</small>
        <input type="text" class="w-100" v-model="modalTags">
        <p class="text-red">{{modalError}}</p>
        <div class="d-flex flex-row justify-content-end mt-3">
          <b-button class="mr-2 " @click="closeModal">Cancel</b-button>
          <b-button variant="success" class="mr-2 " @click="saveDraft">Save As Draft</b-button>
          <b-button variant="primary" class="mr-2" @click="savePublish">Publish</b-button>
        </div>
    </b-modal>
    `,
});

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

//<b-form-file type="file" ref="file" id="file" v-model="modalImage" accept="image/*"></b-form-file>