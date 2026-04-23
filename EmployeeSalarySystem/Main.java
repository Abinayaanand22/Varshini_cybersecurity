abstract class Employees
{
    int EmpId;
    String empName;
    double baseSalary;
    Employees(int EmpId,String empName,double baseSalary)
    {
        this.EmpId=EmpId;
        this.empName=empName;
        this.baseSalary=baseSalary;
    }
    abstract void calculateSalary();
    void displayEmployee()
    {
        System.out.println("Employee name:" + empName);
        System.out.println("Employee id:" +EmpId);
        
    }

}
class FullTimeEmployee extends Employees
{
    double bonus=5000;
    FullTimeEmployee(int EmpId,String empName,double baseSalary)
    {
        super(EmpId,empName,baseSalary);
        
    }
    void calculateSalary()
    {
        double totalSalary=baseSalary+bonus;
        System.out.println("Full Time Salary:" +totalSalary);
 
    }
}
class PartTimeEmployee extends Employees
{
    int hours=20;
    double rate=200;
    PartTimeEmployee(int EmpId,String empName,double baseSalary)
    {
    super(EmpId,empName,baseSalary);
    }
    void calculateSalary()
    {
        double totalSalary=hours*rate;
        System.out.println("Part Time Salary:" + totalSalary);

        
    }
}
class Intern extends Employees
{
    double Stiphend=8000;
    Intern(int EmpId,String empName,double baseSalary)
    {
        super(EmpId,empName,baseSalary);
    }
    void calculateSalary()
    {
        System.out.println(" Intern Stiphend:"+Stiphend);
        
    }
}
public class Main
{
    public static void main(String[] arg)
    {
        Employees e1=new FullTimeEmployee(1,"Varshini",20000.0);
        Employees e2=new PartTimeEmployee(2,"Vishu",0);
        Employees e3=new Intern(3,"Varshu",0);
        e1.displayEmployee();
        e1.calculateSalary();
        e2.displayEmployee();
        e2.calculateSalary();
        e3.displayEmployee();
        e3.calculateSalary();
}
}