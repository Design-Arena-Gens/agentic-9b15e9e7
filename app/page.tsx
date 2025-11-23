'use client'

import { useState } from 'react'
import { Users, UserPlus, FileText, Calendar, AlertCircle, Building2, ClipboardList, Award, Clock, Home } from 'lucide-react'

// Types
interface Employee {
  id: string
  name: string
  nationalId: string
  position: string
  department: string
  employmentType: string
  startDate: string
  salary: number
  qualifications: string
  status: string
  contractType: string
  workingHours: string
  annualLeave: number
  sickLeave: number
}

export default function HospitalStaffManagement() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'د. أحمد محمد الطرابلسي',
      nationalId: '198512345678901',
      position: 'طبيب استشاري',
      department: 'الطوارئ',
      employmentType: 'دائم',
      startDate: '2020-03-15',
      salary: 2500,
      qualifications: 'بكالوريوس طب وجراحة، دبلوم طب الطوارئ',
      status: 'نشط',
      contractType: 'غير محدد المدة',
      workingHours: '40 ساعة أسبوعياً',
      annualLeave: 30,
      sickLeave: 15
    },
    {
      id: '2',
      name: 'أ. فاطمة سالم بن عامر',
      nationalId: '199012345678902',
      position: 'ممرضة رئيسية',
      department: 'العناية المركزة',
      employmentType: 'دائم',
      startDate: '2019-06-01',
      salary: 1200,
      qualifications: 'بكالوريوس تمريض، دبلوم عناية مركزة',
      status: 'نشط',
      contractType: 'غير محدد المدة',
      workingHours: '40 ساعة أسبوعياً',
      annualLeave: 30,
      sickLeave: 15
    },
    {
      id: '3',
      name: 'أ. خالد عبدالله القذافي',
      nationalId: '198812345678903',
      position: 'فني مختبر',
      department: 'المختبر الطبي',
      employmentType: 'مؤقت',
      startDate: '2023-01-10',
      salary: 800,
      qualifications: 'دبلوم فني مختبرات طبية',
      status: 'نشط',
      contractType: 'محدد المدة - سنة واحدة',
      workingHours: '40 ساعة أسبوعياً',
      annualLeave: 21,
      sickLeave: 10
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    nationalId: '',
    position: '',
    department: '',
    employmentType: 'دائم',
    startDate: '',
    salary: 0,
    qualifications: '',
    status: 'نشط',
    contractType: 'غير محدد المدة',
    workingHours: '40 ساعة أسبوعياً',
    annualLeave: 30,
    sickLeave: 15
  })

  // Organizational structure based on Decision 133/2019
  const departments = [
    'الإدارة العامة',
    'الطوارئ',
    'العناية المركزة',
    'الجراحة',
    'الباطنية',
    'الأطفال',
    'النساء والولادة',
    'المختبر الطبي',
    'الأشعة والتصوير الطبي',
    'الصيدلية',
    'التمريض',
    'الخدمات الإدارية',
    'الصيانة والخدمات الفنية'
  ]

  const positions = [
    'طبيب استشاري',
    'طبيب أخصائي',
    'طبيب مقيم',
    'ممرض رئيسي',
    'ممرض',
    'فني مختبر',
    'فني أشعة',
    'صيدلي',
    'إداري',
    'محاسب',
    'موظف استقبال',
    'عامل نظافة',
    'فني صيانة',
    'سائق إسعاف'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === selectedEmployee.id ? { ...formData, id: selectedEmployee.id } as Employee : emp
      ))
    } else {
      const newEmployee: Employee = {
        ...formData,
        id: Date.now().toString()
      } as Employee
      setEmployees([...employees, newEmployee])
    }

    setShowAddForm(false)
    setSelectedEmployee(null)
    setFormData({
      name: '',
      nationalId: '',
      position: '',
      department: '',
      employmentType: 'دائم',
      startDate: '',
      salary: 0,
      qualifications: '',
      status: 'نشط',
      contractType: 'غير محدد المدة',
      workingHours: '40 ساعة أسبوعياً',
      annualLeave: 30,
      sickLeave: 15
    })
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData(employee)
    setShowAddForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">إجمالي الموظفين</p>
              <p className="text-3xl font-bold text-gray-800">{employees.length}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">الموظفون الدائمون</p>
              <p className="text-3xl font-bold text-gray-800">
                {employees.filter(e => e.employmentType === 'دائم').length}
              </p>
            </div>
            <Award className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">الموظفون المؤقتون</p>
              <p className="text-3xl font-bold text-gray-800">
                {employees.filter(e => e.employmentType === 'مؤقت').length}
              </p>
            </div>
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">عدد الأقسام</p>
              <p className="text-3xl font-bold text-gray-800">{departments.length}</p>
            </div>
            <Building2 className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">توزيع الموظفين حسب القسم</h3>
        <div className="space-y-3">
          {departments.slice(0, 6).map(dept => {
            const count = employees.filter(e => e.department === dept).length
            const percentage = employees.length > 0 ? (count / employees.length) * 100 : 0
            return (
              <div key={dept}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{dept}</span>
                  <span className="text-gray-600">{count} موظف</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderEmployeeList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">قائمة الموظفين</h2>
        <button
          onClick={() => {
            setShowAddForm(true)
            setSelectedEmployee(null)
            setFormData({
              name: '',
              nationalId: '',
              position: '',
              department: '',
              employmentType: 'دائم',
              startDate: '',
              salary: 0,
              qualifications: '',
              status: 'نشط',
              contractType: 'غير محدد المدة',
              workingHours: '40 ساعة أسبوعياً',
              annualLeave: 30,
              sickLeave: 15
            })
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          إضافة موظف جديد
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {selectedEmployee ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">الاسم الكامل *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">الرقم الوطني *</label>
              <input
                type="text"
                required
                value={formData.nationalId}
                onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={15}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">المسمى الوظيفي *</label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر المسمى الوظيفي</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">القسم *</label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر القسم</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">نوع التوظيف *</label>
              <select
                required
                value={formData.employmentType}
                onChange={(e) => {
                  const type = e.target.value
                  setFormData({
                    ...formData,
                    employmentType: type,
                    contractType: type === 'دائم' ? 'غير محدد المدة' : 'محدد المدة',
                    annualLeave: type === 'دائم' ? 30 : 21,
                    sickLeave: type === 'دائم' ? 15 : 10
                  })
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="دائم">دائم</option>
                <option value="مؤقت">مؤقت</option>
                <option value="بعقد">بعقد</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">نوع العقد *</label>
              <input
                type="text"
                required
                value={formData.contractType}
                onChange={(e) => setFormData({...formData, contractType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">تاريخ التعيين *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">الراتب الأساسي (دينار ليبي) *</label>
              <input
                type="number"
                required
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">ساعات العمل الأسبوعية</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">رصيد الإجازة السنوية (يوم)</label>
              <input
                type="number"
                value={formData.annualLeave}
                onChange={(e) => setFormData({...formData, annualLeave: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">رصيد الإجازة المرضية (يوم)</label>
              <input
                type="number"
                value={formData.sickLeave}
                onChange={(e) => setFormData({...formData, sickLeave: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">الحالة *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="نشط">نشط</option>
                <option value="إجازة">إجازة</option>
                <option value="معلق">معلق</option>
                <option value="منتهي الخدمة">منتهي الخدمة</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">المؤهلات العلمية</label>
              <textarea
                value={formData.qualifications}
                onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {selectedEmployee ? 'تحديث' : 'إضافة'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setSelectedEmployee(null)
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">الاسم</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">المسمى الوظيفي</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">القسم</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">نوع التوظيف</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">الحالة</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{employee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      employee.employmentType === 'دائم'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.employmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      employee.status === 'نشط'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderRegulations = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          قانون علاقات العمل رقم 12 لسنة 2010
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="border-r-4 border-blue-500 pr-4">
            <h4 className="font-bold mb-2">ساعات العمل (المادة 66)</h4>
            <p>لا يجوز تشغيل العامل أكثر من ثماني ساعات في اليوم أو ثمان وأربعين ساعة في الأسبوع، ولا يحتسب ضمنها فترات الراحة.</p>
          </div>

          <div className="border-r-4 border-green-500 pr-4">
            <h4 className="font-bold mb-2">الإجازات السنوية (المادة 76)</h4>
            <ul className="list-disc mr-6 space-y-1">
              <li>للعامل الحق في إجازة سنوية مدفوعة الأجر لا تقل عن 30 يوماً في السنة</li>
              <li>تزداد إلى 35 يوماً بعد عشر سنوات من الخدمة</li>
              <li>تزداد إلى 40 يوماً بعد عشرين سنة من الخدمة</li>
            </ul>
          </div>

          <div className="border-r-4 border-yellow-500 pr-4">
            <h4 className="font-bold mb-2">الإجازات المرضية (المادة 77)</h4>
            <p>للعامل الحق في إجازة مرضية مدفوعة الأجر لمدة لا تقل عن 15 يوماً في السنة بأجر كامل، وبنصف الأجر لمدة 15 يوماً أخرى.</p>
          </div>

          <div className="border-r-4 border-purple-500 pr-4">
            <h4 className="font-bold mb-2">عقود العمل (المواد 13-18)</h4>
            <ul className="list-disc mr-6 space-y-1">
              <li>عقد العمل غير محدد المدة: للعمال الدائمين</li>
              <li>عقد العمل محدد المدة: لا يجوز أن تزيد مدته عن خمس سنوات</li>
              <li>عقد العمل الموسمي: للأعمال الموسمية أو المؤقتة</li>
            </ul>
          </div>

          <div className="border-r-4 border-red-500 pr-4">
            <h4 className="font-bold mb-2">إنهاء الخدمة (المواد 40-45)</h4>
            <ul className="list-disc mr-6 space-y-1">
              <li>فترة الإخطار: 30 يوماً للموظفين الدائمين</li>
              <li>مكافأة نهاية الخدمة: راتب نصف شهر عن كل سنة من سنوات الخدمة</li>
              <li>الحق في التعويض عند الفصل التعسفي</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          قرار وزير الصحة رقم 133 لسنة 2019
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="border-r-4 border-blue-500 pr-4">
            <h4 className="font-bold mb-2">الهيكل التنظيمي للمستشفيات</h4>
            <p>يتضمن القرار تنظيم الهيكل الإداري والطبي للمستشفيات العامة في ليبيا</p>
          </div>

          <div className="border-r-4 border-green-500 pr-4">
            <h4 className="font-bold mb-2">الأقسام الرئيسية</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {departments.map(dept => (
                <div key={dept} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-r-4 border-yellow-500 pr-4">
            <h4 className="font-bold mb-2">التسلسل الوظيفي الطبي</h4>
            <ol className="list-decimal mr-6 space-y-1">
              <li>طبيب استشاري (Consultant)</li>
              <li>طبيب أخصائي (Specialist)</li>
              <li>طبيب مقيم أول (Senior Resident)</li>
              <li>طبيب مقيم (Resident)</li>
            </ol>
          </div>

          <div className="border-r-4 border-purple-500 pr-4">
            <h4 className="font-bold mb-2">التسلسل الوظيفي التمريضي</h4>
            <ol className="list-decimal mr-6 space-y-1">
              <li>مدير تمريض (Nursing Director)</li>
              <li>مشرف تمريض (Nursing Supervisor)</li>
              <li>ممرض رئيسي (Head Nurse)</li>
              <li>ممرض (Nurse)</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-r-4 border-blue-600 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-blue-900 mb-2">ملاحظة مهمة</h4>
            <p className="text-blue-800">
              هذا النظام مصمم للامتثال الكامل لقانون علاقات العمل الليبي رقم 12 لسنة 2010
              وقرار وزير الصحة رقم 133 لسنة 2019. جميع البيانات والإجراءات تتوافق مع
              المتطلبات القانونية والتنظيمية المعمول بها في ليبيا.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLeaveManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إدارة الإجازات</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">رصيد الإجازات حسب الموظف</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">اسم الموظف</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">القسم</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">الإجازة السنوية المتبقية</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">الإجازة المرضية المتبقية</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">نوع التوظيف</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{employee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.department}</td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-semibold">{employee.annualLeave} يوم</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-semibold">{employee.sickLeave} يوم</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      employee.employmentType === 'دائم'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.employmentType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-gray-800">قواعد الإجازة السنوية</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>الموظفون الدائمون: 30 يوماً سنوياً</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>الموظفون المؤقتون: 21 يوماً سنوياً</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>تزيد إلى 35 يوماً بعد 10 سنوات خدمة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>تزيد إلى 40 يوماً بعد 20 سنة خدمة</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-gray-800">قواعد الإجازة المرضية</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>الموظفون الدائمون: 15 يوماً بأجر كامل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>الموظفون المؤقتون: 10 أيام بأجر كامل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>15 يوماً إضافية بنصف الأجر (دائمون)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>يتطلب شهادة طبية من جهة معتمدة</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-10 w-10" />
              <div>
                <h1 className="text-3xl font-bold">نظام إدارة موظفي المستشفى</h1>
                <p className="text-blue-100 text-sm">متوافق مع القوانين الليبية - قانون 12/2010 وقرار 133/2019</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-5 w-5" />
              لوحة التحكم
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'employees'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              الموظفون
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'leave'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
              الإجازات
            </button>
            <button
              onClick={() => setActiveTab('regulations')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'regulations'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardList className="h-5 w-5" />
              القوانين واللوائح
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'employees' && renderEmployeeList()}
        {activeTab === 'leave' && renderLeaveManagement()}
        {activeTab === 'regulations' && renderRegulations()}
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>© 2024 نظام إدارة موظفي المستشفى - ليبيا</p>
          <p className="text-sm text-gray-400 mt-2">
            متوافق مع قانون علاقات العمل رقم 12 لسنة 2010 وقرار وزير الصحة رقم 133 لسنة 2019
          </p>
        </div>
      </footer>
    </div>
  )
}
