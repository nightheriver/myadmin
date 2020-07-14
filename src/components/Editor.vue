<template>
    <quill-editor class="editor"
 v-model="content"
 ref="myQuillEditor"
:options="editorOption"
 @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
 @change="onEditorChange($event)">

        </quill-editor>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
 export default {
    name: "Editor",
    props:{
        inputs:{}
    },
    data() {
      return {
        content:null,
        editorOption:{}
        };
    },
    methods:{
        onEditorBlur(){
        },
        onEditorFocus(editor){//获得焦点事件

        },
        onEditorChange(){//内容改变事件
            this.$emit('input',this.content)
        }
    },
    watch: {
        inputs(newv){
          this.content = newv
        }
    },
}
</script>
<style>
    .edit_container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .ql-editor{
         height:300px;
     }
</style>

