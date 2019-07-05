<template>
    <div>
        <table>
            <tr v-for="(item,index) in list" 
            :key="index" :class="index%2==0?yellow:red">121</tr>
        </table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list:[1,2,3,6,5],
            yellow:'yellow',
            red:'red'
        }
    }
}
</script>
<style lang="less" scoped>
.yellow{
    background: yellow
}
.red{
    background: red;
}
</style>


