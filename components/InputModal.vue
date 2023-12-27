<script setup>
const {open} = defineProps(['open']);
const emits = defineEmits(['close', 'reload']);

// init data
const form = ref();
const state = reactive({ 
    // data
    requestForm: {
        name: '',
        position: '',
        userId: '',
    },
    //events
    loading: false,
})

//Form Rules
const ruleKeys = ["name","position", "userId"]
const rules = {};
ruleKeys.forEach((key) => {
    Object.assign(rules, {
        [key] : [{
            required: true,
            message: "This field is required",
            trigger: "change"
        }]
    });
});


const handleSubmit = async () =>  {
    try {
        state.loading = true;
        await form.value.validate();
        await useFetch(`/api/clockify/save-account`, {
            method: 'post',
            body: state.requestForm
        });
    } catch (error) {
        console.log('error :>> ', error);
    } finally {
        state.loading = false;
        emits('close')
        emits('reload')
    }

}
const handleCancel = () => {
    console.log('Clicked cancel button');
    emits('close')
}


</script>

<template>
    <div>
        <a-modal
        :open="open"
        title="Input Details"
        @cancel="handleCancel"
        @ok="handleSubmit"
        > 
            <template #footer>
                <a-button key="back" @click="handleCancel">Cancel</a-button>
                <a-button key="submit" type="primary" :loading="state.loading" @click="handleSubmit">Submit</a-button>
            </template>
            <a-form  :model="state.requestForm" ref="form"  :name="form" :rules="rules" layout="vertical" >
                <a-form-item  label="Name" name="name" style="margin-bottom: 0;" >
                    <a-input  v-model:value="state.requestForm.name" placeholder="Please input your name" />
                </a-form-item>
                <a-form-item   label="Job Position" name="position" style="margin-bottom: 0;">
                    <a-input  v-model:value="state.requestForm.position" placeholder="Please input your job position" />
                </a-form-item>
                <!-- <a-form-item   label="Clockify API key" name="apikey" style="margin-bottom: 0;">
                    <a-input v-model:value="state.requestForm.apikey" placeholder="**************************" />
                </a-form-item>
                <a-form-item   label="Clockify workspace id" name="workspaceId" style="margin-bottom: 0;">
                    <a-input v-model:value="state.requestForm.workspaceId" placeholder="**************************" />
                </a-form-item> -->
                <a-form-item   label="Clockify User ID" name="userId" style="margin-bottom: 0;">
                    <a-input-password v-model:value="state.requestForm.userId" placeholder="**************************" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>