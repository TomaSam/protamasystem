package lt.vtmc.ProTaMa.service;

import java.io.PrintWriter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;

public class ExportCsv<T> {
	
	private static final Logger log = LoggerFactory.getLogger(ExportCsv.class);
	
	public void exportDataToCsv(PrintWriter writer, List<T> data)  throws CsvException {
		StatefulBeanToCsv<T> dataCsv = new StatefulBeanToCsvBuilder<T>(writer)
				.withQuotechar(CSVWriter.DEFAULT_QUOTE_CHARACTER)
				.withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false)
				.build();
		
		dataCsv.write(data);
		log.info("Exported data");
	}

}
