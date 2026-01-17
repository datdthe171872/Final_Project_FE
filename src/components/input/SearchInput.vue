<template>
    <div class="search-input">
        <div class="icon">
            <div class="icon-search"></div>
        </div>
        <input type="text" v-model="model" :placeholder="placeholder" @focus="isFocus = true" @blur="isFocus = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const model = defineModel();
defineProps({
    placeholder: {
        type: String,
        default: 'Tìm...'
    }
});

const isFocus = ref(false);

</script>
<style scoped>
.search-input {
    display: flex;
    align-items: center;
    width: 200px;
    height: 35px;
    gap: 5px;
    padding-left: 8px;
    border: 1px solid #afafaf;
    border-radius: 6px;
    background: white;
}

/* Hover */
.search-input:hover {
    border-color: #409eff;
}

/* Focus */
.search-input:focus-within {
    border-color: #409eff;
}

.icon-search {
    background: url('../../assets/icon/qlts-icon.svg') no-repeat -243px -23px;
    width: 18px;
    height: 18px;
}

input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
}

/* Placeholder */
input::placeholder {
    font-size: 13px;
    font-style: italic;
}
</style>