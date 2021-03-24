<template>
  <div v-if="open">
    <div class="row">
      <h3 class="col-auto">Statics</h3>
      <div class="col-auto  mt-1">
        <select class="custom-select custom-select-sm " v-model="selectedClass">
          <option
            v-for="(item, index) in classes"
            v-bind:value="item"
            :key="index"
            >{{ item.className }}</option
          >
        </select>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-primary btn-xs mt-1 ml-2 "
          v-on:click="createClass"
        >
          Create a class
        </button>
        <button
          class="btn btn-danger btn-xs mt-1 ml-2"
          v-on:click="deleteClass"
        >
          Remove class
        </button>
        <button class="btn btn-primary btn-xs mt-1 ml-2" v-on:click="createRow">
          Add row
        </button>
        <button class="btn btn-danger btn-xs mt-1 ml-2" v-on:click="deleteRow">
          Remove row
        </button>
        <button
          class="btn btn-primary btn-xs mt-1 ml-2"
          v-on:click="createColumn"
        >
          Add column
        </button>
        <button
          class="btn btn-danger btn-xs mt-1 ml-2"
          v-on:click="deleteColumn"
        >
          Remove column
        </button>
      </div>
    </div>
    <div>
      <!-- Add class -->
      <div class="row  ml-4 mt-4" v-if="addClass">
        <label class="mt-2 col-auto">Class:</label>
        <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
          <input
            type="text"
            v-model="classV.name"
            class="form-control col-auto"
            placeholder="class"
          />
        </div>

        <button
          class="btn btn-success btn-xs mt-1 ml-4 col-auto"
          v-on:click="saveClass"
        >
          Save
        </button>
      </div>
      <!--Fetch data -->
      <MDBTable responsive="md" class="mt-4">
        <caption>
          Static data for
          {{
            selectedClass.className
          }}
        </caption>

        <thead>
          <tr>
            <th scope="col">
              <fa class="icon" :icon="['fa', 'square']" size="1x" />
            </th>
            <th
              class="columnName"
              v-for="(column, index) in columns"
              :key="index"
            >
              {{ column.key }}
              <small>
                ({{ getTypeOfColumn(column.value).toUpperCase() }})</small
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <div class="ml-2">
              <input
                type="checkbox"
                class="form-check-input"
                v-bind:value="row._id"
                v-model="checkedRows"
              />
            </div>
            <td
              class="input-group-sm"
              v-for="column in columns"
              :key="column.key"
            >
              <input
                v-bind:id="column.key"
                type="text"
                class="form-control"
                v-bind:value="row[column.key]"
                @blur="updateRow($event, row)"
              />
            </td>
          </tr>
        </tbody>
      </MDBTable>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import { MDBTable } from 'mdb-vue-ui-kit';

export default {
  props: ['open'],
  data() {
    return {
      addClass: false,
      classV: {
        name: '',
        token: ''
      },
      classes: [],
      selectedClass: '',
      columns: [],
      column: {},
      columnValue: undefined,
      columnNames: {},
      rows: [],
      checkedRows: [],
      token: '',
      reservedDocumentKeys: [
        '_posts',
        '_pres',
        'collection',
        'emit',
        'errors',
        'get',
        'set',
        'init',
        'isModified',
        'isNew',
        'listeners',
        'modelName',
        'on',
        'once',
        'populated',
        'prototype',
        'remove',
        'removeListener',
        'save',
        'schema',
        'toObject',
        'validate'
      ]
    };
  },
  components: {
    MDBTable
  },
  computed: {},
  methods: {
    getTypeOfColumn(value) {
      return typeof value;
    },
    createClass() {
      this.addClass = !this.addClass;
    },
    async getClasses() {
      let res = await this.$http.get(`static-class`, {
        params: { token: this.token }
      });

      this.classes = res.data.classes;
      if (this.classes.length == 0) {
        this.selectedClass = { className: '' };
      } else {
        this.selectedClass = this.classes[0];
      }
    },
    async saveClass() {
      try {
        this.classV.token = this.token;
        this.classV.name = this.classV.name.toLowerCase();
        let res = await this.$http.post('static-class', this.classV);
        if (res) {
          this.getClasses();
          this.addClass = false;
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteClass() {
      if (this.selectedClass != '') {
        swal
          .fire({
            title: `Remove ${this.selectedClass.className.toUpperCase()} class?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
          })
          .then(async result => {
            if (result.isConfirmed) {
              try {
                let res = await this.$http.delete(`static-class`, {
                  data: { token: this.token, class: this.selectedClass }
                });
                if (res) {
                  this.getClasses();
                  this.getColumns();
                  this.selectedClass = { className: '' };
                  swal.fire('Success', res.data.msg, 'success');
                }
              } catch (error) {
                swal.fire('Error', error.response.data.err, 'error');
              }
            }
          });
      }
    },
    async createColumn() {
      const { value: column } = await swal.fire({
        title: 'Enter column name',
        input: 'text',
        inputLabel:
          'Don’t use any special characters, and start your name with a letter.',
        inputPlaceholder: 'columnName',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        inputValidator: value => {
          if (!value) {
            return 'Name cant be empty';
          } else if (this.reservedDocumentKeys.includes(value)) {
            swal.fire({
              text:
                'This key is count as a reserved key please use another one',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok!'
            });
          } else if (Object.values(this.columnNames).includes(value)) {
            return 'This key is exist ';
          }
        }
      });
      if (column) {
        const { value: type } = await swal.fire({
          title: 'What type of data do you want to store?',
          input: 'select',
          inputOptions: {
            boolean: 'Boolean',
            number: 'Number',
            string: 'String'
          },
          inputPlaceholder: 'Select a type',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return 'You need to select a type';
            }
          }
        });

        switch (type) {
          case 'boolean':
            this.saveColumn(false, column);
            break;
          case 'number':
            this.saveColumn(0, column);
            break;
          case 'string':
            this.saveColumn('', column);
            break;
          default:
            break;
        }
      }
    },
    async getColumns() {
      try {
        if (
          this.selectedClass.className != '' ||
          this.selectedClass != undefined
        ) {
          this.columns = [];
          this.columnNames = {};
          let res = await this.$http.get(`static-class-column`, {
            params: {
              token: this.token,
              collectionName: this.selectedClass.className
            }
          });

          if (res) {
            this.columns = res.data.columns;

            // save column names to check if the admin does not add the same name again
            for (let i = 0; i < this.columns.length; i++) {
              var key = this.columns[i].key;
              this.columnNames = Object.assign({ [i]: key }, this.columnNames);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async saveColumn(value, columnName) {
      try {
        this.column.token = this.token;
        this.column.collection = this.selectedClass;
        this.column.columnName = columnName;
        this.column.value = value; // defult value for first time
        let res = await this.$http.post('static-class-column', this.column);
        if (res) {
          this.getColumns();
          this.column = {};
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteColumn() {
      const { value: deleteKey } = swal
        .fire({
          title: 'Which key do you want to remove?',
          input: 'select',
          inputOptions: Object.values(this.columnNames),
          inputPlaceholder: 'Select a key',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Remove it!',
          inputValidator: value => {
            if (!value) {
              return 'You need to select a key';
            }
          }
        })
        .then(async result => {
          if (result.isConfirmed) {
            try {
              this.column.token = this.token;
              this.column.collection = this.selectedClass;
              this.column.column = this.columns[result.value];

              let res = await this.$http.delete(`static-class-column`, {
                data: this.column
              });
              if (res) {
                this.getColumns();
                this.column = {};
                swal.fire('Success', res.data.msg, 'success');
              }
            } catch (error) {
              swal.fire('Error', error.response.data.err, 'error');
            }
          }
        });
    },
    async createRow() {
      try {
        var data = {};

        data.token = this.token;
        data.columns = this.columns;
        data.collectionName = this.selectedClass.className;
        let res = await this.$http.post('static-class-row', data);
        if (res) {
          await this.getRows();
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async getRows() {
      let res = await this.$http.get(`static-class-row`, {
        params: {
          token: this.token,
          collectionName: this.selectedClass.className
        }
      });
      this.rows = res.data.rows;
    },
    async updateRow(e, row) {
      console.log('blur', e.target.id);
      console.log('blur', typeof e.target.value);
      console.log(row._id);

      try {
        var data = {};

        data.token = this.token;
        data.rowId = row._id;
        data.collectionName = this.selectedClass.className;
        data.columnName = e.target.id;
        data.value = e.target.value;
        let res = await this.$http.post('static-class-row-update', data);
        if (res) {
          await this.getRows();
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteRow() {
      try {
        let res = await this.$http.delete(`static-class-row`, {
          data: {
            token: this.token,
            collectionName: this.selectedClass.className,
            rows: this.checkedRows
          }
        });
        if (res) {
          this.getRows();
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    }
  },
  watch: {
    async selectedClass(newCollcetion, oldCollection) {
      if (newCollcetion.className != undefined) {
        await this.getColumns();
        await this.getRows();
      }
    }
  },
  async created() {
    this.token = await localStorage.getItem('jwt');
    await this.getClasses();
    await this.getColumns();
    await this.getRows();
  }
};
</script>

<style scoped>
.btn-xs {
  padding: 5px 20px;
  font-size: 12px;
}
.btn {
  max-height: 30px;
}
/* The heart of the matter */
.testimonial-group > .row {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.testimonial-group > .row > .col-2 {
  display: inline-block;
}
th.columnName {
  font-size: 14px;
}
</style>
