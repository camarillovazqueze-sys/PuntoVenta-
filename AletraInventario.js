import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class InventarioAlerta {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/puntoventa"; 
        String usuario = "root";
        String clave = ""; 

        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); 

           
            try (Connection conexion = DriverManager.getConnection(url, usuario, clave);
                 Statement stmt = conexion.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT id, nombre, stock FROM productos")) {

                System.out.println("Conexion exitosa!");

                while (rs.next()) {
                  
                    String nombre = rs.getString("nombre");
                    int stock = rs.getInt("stock");

                    System.out.println("Producto: " + nombre + " | Stock: " + stock);

                   
                    if (stock == 0) {
                        JOptionPane.showMessageDialog(null,
                                "El producto \"" + nombre + "\" esta agotado en inventario.",
                                "Alerta de Inventario",
                                JOptionPane.ERROR_MESSAGE);
                    } else if (stock <= 5) {
                        JOptionPane.showMessageDialog(null,
                                "El producto \"" + nombre + "\" esta a punto de agotarse (Stock: " + stock + ").",
                                "Alerta de Inventario",
                                JOptionPane.WARNING_MESSAGE);
                    }
                }

            } 

        } catch (Exception e) {
            
            JOptionPane.showMessageDialog(null,
                    "Error en la conexion o consulta: " + e.getMessage(),
                    "Error de Base de Datos",
                    JOptionPane.ERROR_MESSAGE);
            e.printStackTrace(); 
        }
    }
}
