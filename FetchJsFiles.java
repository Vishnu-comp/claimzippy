import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;

public class FetchJsFiles {

    private static StringBuilder jsFilesContent = new StringBuilder();

    public static void main(String[] args) {
        // Array of specific folders to search for JavaScript files
        String[] directoryPaths = {
            "src" // Add more folders as needed
        };
        
        String outputFilePath = "js_files.txt"; // Output file name

        // Iterate through each specified directory
        for (String path : directoryPaths) {
            fetchJsFiles(new File(path));
        }

        // Write results to the output file
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFilePath))) {
            writer.write(jsFilesContent.toString());
            System.out.println("JavaScript files content has been saved to " + outputFilePath);
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }

    private static void fetchJsFiles(File directory) {
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        // Recursively search in subdirectories
                        fetchJsFiles(file);
                    } else if (file.getName().endsWith(".js")) {
                        // Get the folder name and file name
                        String folderName = directory.getName();
                        String fileName = file.getName();
                        String relativePath = folderName + "/" + fileName;

                        // Read file content
                        String fileContent = readFileContent(file);
                        jsFilesContent.append("File: ").append(relativePath).append("\n")
                                       .append(fileContent).append("\n\n");
                    }
                }
            }
        } else {
            System.err.println("Directory does not exist: " + directory.getPath());
        }
    }

    private static String readFileContent(File file) {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        } catch (IOException e) {
            System.err.println("Error reading file " + file.getPath() + ": " + e.getMessage());
        }
        return content.toString();
    }
}
