<template>
  <Suspense>
    <el-container style="height: 100vh;">
      <el-aside width="320px" style="padding-bottom:8px;border-right:1px solid #eee">
        <el-header>
          <h2 style="font-size:25px;margin: 10px 0px;">卒業要件チェッカー</h2>
          <!-- <h2>Degree Requirement Checker</h2> -->
          <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="left-start">
            <el-button icon="el-icon-info" type="text" circle></el-button>
          </el-tooltip>
          <el-tag size="small" type="info" color="#f6a3b1" effect="dark" ><b> Info </b>
          </el-tag>&nbsp; -->
        </el-header>
        <deg-req-checker style="font-size: 15px">
        </deg-req-checker>
      </el-aside>
      <el-container>
        <el-header>
          <h2 style="font-size:25px;margin: 10px 0px;"> 履修計画 </h2>
          <!-- <h2> Academic Planner </h2> -->
        </el-header>
        <el-main>
          <planner-year-collapse></planner-year-collapse>
          <!-- <button @click="drc.addCourse"> add course</button> -->

        </el-main>
      </el-container>
    </el-container>
    <template #fallback>
      <el-container>
        <el-icon class="is-loading" style="position: absolute; top: 50%; left: 50%">
          <Loading style="transform: scale(5);"/>
        </el-icon>
      </el-container>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  // import { DRC } from '@qcampusmate-mate/plasapo-core'
  import { DRC } from './DRC' 
  // import { DegReqChecker, PlannerYearCollapse } from '@qcampusmate-mate/plasapo-ui'
  import DegReqChecker from '@/drc/components/DegReqChecker.vue' 
  import PlannerYearCollapse from '@/drc/components/PlannerYearCollapse.vue'

  const drc = new DRC().initialize()
  provide('drc', drc)
</script>

<style scoped>
</style>