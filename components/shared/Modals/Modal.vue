<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" @click="$emit('close')" class="close"><span >&times;</span></button>
                    <h4 class="modal-title">
                        {{ model_title }}
                    </h4>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="$emit('close')">Close</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            model_title: {
                required: true
            }
        }
    }
</script>

<style>
    .modal-active{
        display:block;
    }
</style>
