<template>
  <!--  -->
  <div class="edit_dev">
    <el-transfer
    v-model="targetList"
    filterable
    :filter-method="filterMethod"
    :titles="['未修得リスト', '追加リスト']"
    filter-placeholder="講義を検索"
    :data="data"
    :props="{
      key: 'plan_entry_id',
      label: 'subject',
    }"
    />
  </div>
  
</template>
<style scoped>
/** 
 * >>> and ::v-deep() 
 * https://vue-loader-v14.vuejs.org/en/features/scoped-css.html
 */

/* .edit_dev >>> .el-transfer {
  padding: 0 150px;
} */
.edit_dev :deep(.el-transfer:first-child) {
  margin-left:10px;
}

/* .edit_dev >>> .el-transfer:last-child {
  margin-right:50px;
} */

.edit_dev :deep(.el-transfer-panel){
  width: 43%;
}

.edit_dev :deep(.el-transfer-panel__filter){
  width:485px;
}
</style>

<script lang="ts" setup>
import { ElTransfer } from 'element-plus'
import { ref } from 'vue'
import { PlannerTableEntry } from "@qcampusmate-mate/types"
import { courseData } from '../../fixtures/course_mock'

// defineEmits(['update:modelValue'])

// El Transfer methods

/* Hard-code course data */
const mockCourseData = () => {
  const data: PlannerTableEntry[] = []

  courseData.forEach((course, i) => {
    data.push({
      ...course,
      plan_entry_id: i,
      isPlan: true
    })

    // data[i].unit = null
  })

  return data
}

const data = ref<PlannerTableEntry[]>(mockCourseData())
const targetList = ref([]) // index of selected data?

const filterMethod= (query: string, item) => {
  return (item.subject?.indexOf(query) > -1 || item.school?.indexOf(query) || item.quarter?.indexOf(query) > -1 || item.target_year?.indexOf(query) > -1) as boolean
}

/*            Event handlers           */
const handleChange = (
  value: number | string,
  direction: 'left' | 'right',
  movedKeys: string[] | number[]
) => {
  // alert(`moveing from ${direction} to ${direction === 'left' ? 'right' : 'left'}\n moved values: ${valu}`, )
  // console.log(value, direction, movedKeys)

  alert(`current value: ${value}`)
}

defineExpose({
  targetList, // 
  data  // source data
})
</script>